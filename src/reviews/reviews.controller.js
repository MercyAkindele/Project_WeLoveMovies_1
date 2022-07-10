const reviewService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next){
    const {reviewId} = req.params;
    const review = await reviewService.read(reviewId);
    if(review){
        res.locals.review = review;
        return next();
    }else{
        next({status: 404, message: "Review cannot be found."});
    }
}


async function update(req, res){
    const updatedReview ={
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id
    };
    // when updating a record
    await reviewService.update(updatedReview)
    // query the database again to return updated record.
    const data = await reviewService.readAddCritic(res.locals.review.review_id)
    res.json({data});
}
async function destroy(req, res){
    await reviewService.delete(res.locals.review.review_id);
    res.sendStatus(204);
}

async function list(req, res){
    const {movieId} = req.params
    if(movieId) {
        res.json({data: await reviewService.listReviewsForMovieId(movieId)});
    }else{
        res.json({ data: await reviewService.listAllReviews() });
    }
}


module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    list: [asyncErrorBoundary(list)],
}