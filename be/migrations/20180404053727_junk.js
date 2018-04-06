
exports.up = function(knex, Promise) {
	return Promise.all([
    knex.schema.createTable('users', function(table) {
        table.increments("id").unsigned().primary();
        table.text("login").unique().notNullable();
        table.text("given_name").notNullable();
        table.text("family_name").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table.boolean("is_active").notNullable().defaultTo(true);
    }),
    knex.schema.createTable('local_passport', function(table) {
        table.increments("id").unsigned().primary();
        table.text("email").unique().notNullable();
        table.text("password").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('facebook_passport', function(table) {
        table.increments("id").unsigned().primary();
        table.text("token").unique().notNullable();
        table.text("name").notNullable();
        table.text("email").unique().notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('twitter_passport', function(table) {
        table.increments("id").unsigned().primary();
        table.text("token").unique().notNullable();
        table.text("displayName").notNullable();
        table.text("username").unique().notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('google_passport', function(table) {
        table.increments("id").unsigned().primary();
        table.text("token").unique().notNullable();
        table.text("email").unique().notNullable();
        table.text("name").notNullable();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('junk', function(t) {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();

        t.string('name').notNull();
        t.text('decription').nullable();
        t.decimal('price', 6, 2).notNull();
        t.enum('category', ['apparel', 'electronics', 'furniture']).notNull();
    })
  ]);
};


exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTable('junk'), 
		knex.schema.dropTable('local_passport'), 
		knex.schema.dropTable('facebook_passport'), 
		knex.schema.dropTable('twitter_passport'), 
		knex.schema.dropTable('google_passport'), 
		knex.schema.dropTable('users')
  ]);
};
