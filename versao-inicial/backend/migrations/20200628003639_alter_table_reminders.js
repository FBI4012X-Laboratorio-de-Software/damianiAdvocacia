
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('reminders', table => {
        table.integer('customer').references('id').inTable('customers')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('reminders', table => {
        table.dropColumn('customer')
    })
};
