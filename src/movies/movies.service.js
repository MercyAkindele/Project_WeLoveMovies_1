const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: "critics.critic_id",
    preferred_name: "critics.preferred_name",
    surname: "critics.surname",
    organization_name : "critics.organization_name",
  });
//show all movies
function list() {
    return knex("movies").select("*");
  }
//shows all movies that are actually showing in theaters without duplicate movies.
  function moviesThatAreShowingList() {

    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true })
      .distinct("m.*")
  }
//reads the movie with a particular movie id
  function read(movieId){
    return knex("movies").select("*").where({movie_id: movieId}).first()
  }
//Joined movies and movies_theaters tables and joined the movies_theaters table
//select all theaters that have a particular movie
  function readTheaters(movieId){
    return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t*").where({"m.movie_id": movieId}).first()
  }

  function readReviews(movieId){
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*","c.*")
    .where({"r.movie_id": movieId})
    .then(addCritic)
  }
module.exports ={
    list,
    moviesThatAreShowingList,
    read,
    readTheaters,
    readReviews

}