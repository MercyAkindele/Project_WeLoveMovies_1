const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name : "critic.organization_name",
  });

  const addCritic2 = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name : "critic.organization_name",
  });

function destroy(reviewId){
    return knex("reviews").where({"review_id":reviewId}).del();
}

function list(movieId){
    return knex("reviews")
        .join("critics", "critics.critic_id", "reviews.critic_id")
        .select("*")
        .where({movie_id:movieId})
        .then((data) => {
            return data.map(addCritic)
        })
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")

}

function read(review_id) {
  return knex("reviews")
    .select("*")
    .where({ review_id })
    .first();
}

function readAddCritic(review_id) {
    return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select("*")
    .where({ review_id })
    .then((data) => {
        return addCritic2(data[0])
    });

}

module.exports = {
    delete: destroy,
    list,
    update,
    read,
    readAddCritic,
}