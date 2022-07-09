
exports.up = function(knex) {
    return knex.schema.createTable("movies", (table) => {
        table.increments("movie_id").primary(); //sets movie id as the primary key
        table.string("title");
        table.integer("runtime_in_minutes");
        table.string("rating");
        table.text("description");
        table.string("image_url");
        table.timestamps(true, true);// makes create at and updated at columns
    });
  
};

exports.down = function(knex) {
  return knex.schema.dropTable("movies");
};
