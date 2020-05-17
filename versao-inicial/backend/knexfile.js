
module.exports = {
  client: 'postgresql',
  connection: {
    database: 'advocacia',
    user: 'postgres',
    password: ''
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
