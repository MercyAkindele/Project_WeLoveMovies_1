const theaterService = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res){
    const{movieId} = req.params
    if(movieId){
        res.json({ data: await theaterService.listTheatersForMovieId(movieId) });
    }
    else {
        res.json({ data: await theaterService.listAllTheaters() });
    }
}
module.exports = {
    list : asyncErrorBoundary(list),
}