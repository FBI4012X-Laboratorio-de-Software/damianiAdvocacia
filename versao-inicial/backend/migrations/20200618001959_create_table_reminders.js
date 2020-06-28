
exports.up = function (knex, Promise) {
    return knex.schema.createTable('reminders', table => {
        table.increments('id').primary()
        table.string('description').notNull()
        table.date('reminderDate').notNull()
        table.integer('userId').references('id').inTable('users')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('reminders')
};
