
exports.up = function(knex) {
    //creates a table called critics and inserts columns
    return knex.schema.createTable("critics", (table) => {
        table.increments("critic_id").primary();//sets critic id as the primary key
        table.string("preferred_name");
        table.string("surname");
        table.string("organization_name");
        table.timestamps(true, true);// adds created at and updated at columns
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("critics");
};
