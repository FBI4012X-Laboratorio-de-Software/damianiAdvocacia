
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('reminders', table => {
        table.string('reminderHour')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('reminders', table => {
        table.dropColumn('reminderHour')
    })
};
