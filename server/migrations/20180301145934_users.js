
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.text('card_number').notNullable();
    table.integer('cvv').notNullable();
    table.date('expires_on').notNullable();
  });
};

exports.down = function(knex, Promise) {

};
