module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = async (req, res) => {
        const customer = { ...req.body }
        if (req.params.id) customer.id = req.params.id
        customer.tipoPessoa = 'F'
        try {
            existsOrError(customer.name, 'Nome não informado.')
            existsOrError(customer.cpfCnpj, 'CPJ/CNPJ não informado.')
            existsOrError(customer.telefone, 'Telefone não informado.')
            existsOrError(customer.email, 'E-mail não informado.')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if (customer.id) {
            app.db('customers')
                .update(customer)
                .where({ id: customer.id })
                .then(_ => req.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('customers')
                .insert(customer)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        console.log('oi')
        app.db('customers')
            .select('id', 'name', 'cpfCnpj', 'tipoPessoa', 'telefone', 'email')
            .then(customers => res.json(customers))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('customers')
            .select('id', 'name', 'cpfCnpj', 'tipoPessoa', 'telefone', 'email')
            .where({ id: req.params.id })
            .first()
            .then(customer => res.json(customer))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('customers')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Cliente não foi encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }
    return { save, get, getById, remove }
}