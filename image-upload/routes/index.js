const router = require("express").Router();
const Movie = require('../models/Movie');
const { uploader, cloudinary } = require('../config/cloudinary');

router.get("/", (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render("index", { movies });
    })
    .catch(err => next(err))
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add');
});

router.post('/movie/add', uploader.single('poster'), (req, res, next) => {
  const { title, description } = req.body;
  // all the info from cloudinary about the uploaded file is in req.file
  console.log(req.file);
  const imgPath = req.file.path;
  const imgName = req.file.originalname;
  const publicId = req.file.filename;
  // create the movie document
  Movie.create({ title, description, imgPath, imgName, publicId })
    .then(movie => {
      console.log(movie);
      res.redirect('/');
    })
    .catch(err => next(err));

});

router.get('/movie/delete/:id', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(movieThatWasDeleted => {
      // if the movie had an image 
      if (movieThatWasDeleted.imgPath) {
        // -> we also want to delete that image on cloudinary
        cloudinary.uploader.destroy(movieThatWasDeleted.publicId);
      }
      // cloudinary.uploader.destroy(<publicId>)
      res.redirect('/')
    })
    .catch(err => next(err));
});


module.exports = router;
