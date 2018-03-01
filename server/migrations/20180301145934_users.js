
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('card_number').notNullable();
    table.string('cvv').notNullable();
    table.string('salt').notNullable();
    table.date('expires_on').notNullable();
    table.datetime('created_at').notNullable();
    table.datetime('updated_at').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
