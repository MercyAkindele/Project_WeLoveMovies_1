const movieService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Validation if a movie actually exists. If it does not exist, give status 404
async function movieExists(req, res, next){
    const { movieId } = req.params;
    const movie = await movieService.read(movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ status: 404, message: `Movie cannot be found.` });
}

//after validation, returns the movie data
async function read (req,res){
    const {movie: data} = res.locals;
    res.json({data});
}


async function list(req, res) {
//if is_showing is true send back data of all the movies that are showing
    if(req.query.is_showing){
        res.json({ data: await movieService.moviesThatAreShowingList() });
//if no query, send back the list of all movies
    }else{
        res.json({ data: await movieService.list() });
    }
  }

module.exports = {
    list: asyncErrorBoundary(list),
    read:[asyncErrorBoundary(movieExists), read],
}