const { authSecret, passEmail, userEmail } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
let nodemailer = require('nodemailer');
let cron = require('node-cron');

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Informe usuário e senha.')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .whereNull('deletedAt')
            .first()

        if (!user) return res.status(400).send("Usuário não encontrado.")

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if (!isMatch) return res.status(401).send('Email/senha inválidos.')

        const now = Math.floor(Date.now() / 1000)
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            iat: now,
            exp: now + (60 * 60 * 24)
        }
        cron.schedule('* 6 * * *', () => {
            app.db({ a: 'reminders', u: 'customers' })
                .select('a.id', 'a.description', 'a.reminderDate', 'a.reminderHour', 'a.userId', { customer: 'u.name' })
                .whereRaw('?? = ??', ['u.id', 'a.customer'])
                .where({
                    'a.reminderDate': new Date().toISOString().slice(0, 10),
                    'a.userId': user.id
                })
                .then(async reminders => {
                    if (typeof reminders !== 'undefined' && reminders.length > 0) {
                        let text = "Você tem lembretes para hoje: \n"

                        reminders.forEach(function (reminder) {
                            text += `\t${reminder.description} as ${reminder.reminderHour.substring(0, 5)} com o cliente ${reminder.customer}\n`
                        })
                        let mailOptions = {
                            from: userEmail,
                            to: user.email,
                            subject: 'Lembretes',
                            text
                        }

                        let transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: userEmail,
                                pass: passEmail
                            }
                        })

                        transporter.sendMail(mailOptions, function (error, info) { });

                        return true
                    }
                })
                .catch()
        })

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) {
            //problemas com token
        }
        return res.send(false)
    }

    return { signin, validateToken }
}
