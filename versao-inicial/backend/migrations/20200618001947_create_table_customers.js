
exports.up = function (knex, Promise) {
    return knex.schema.createTable('customers', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cpfCnpj').notNull()
        table.string('tipoPessoa').notNull()
        table.string('telefone').notNull()
        table.string('email')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('customers')
};
