module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = async (req, res) => {
        const reminder = { ...req.body }
        if (req.params.id) reminder.id = req.params.id
        reminder.userId = req.user.id
        try {
            existsOrError(reminder.description, 'Descrição não informada.')
            existsOrError(reminder.reminderDate, 'Datanão informada.')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (reminder.id) {
            app.db('reminders')
                .update(reminder)
                .where({ id: reminder.id })
                .then(_ => req.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('reminders')
                .insert(reminder)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db({ a: 'reminders', u: 'customers' })
            .select('a.id', 'a.description', 'a.reminderDate', 'a.reminderHour', { customer: 'u.name' }, { telefone: 'u.telefone' })
            .whereRaw('?? = ??', ['u.id', 'a.customer'])
            .where({'a.reminderDate': new Date().toISOString().slice(0, 10)})
            .then(async reminders => {
                reminders.forEach(function (reminder) {
                    reminder.text = `${reminder.description} as ${reminder.reminderHour.substring(0, 5)} com o cliente ${reminder.customer}`
                    if (reminder.telefone) {
                        reminder.telefone = `Telefone para contato: ${reminder.telefone}`
                    }
                })
                res.json(reminders)
            })
            .catch(err => res.status(500).send(err))
    }
    return { save, get }
}