const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");
const reduceMovies = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    description: ["movies", null, "description"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    image_url: ["movies", null, "image_url"],
    is_showing: ["movies", null, "is_showing"],
  });


function listTheatersForMovieId(movie_id) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", " m.*")
    .where({"m.movie_id": movie_id})
    .then(reduceMovies);
}

function listAllTheaters() {
  return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("t.*", " m.*")
    .then(reduceMovies);
}

module.exports = {
  listTheatersForMovieId,
  listAllTheaters,
}