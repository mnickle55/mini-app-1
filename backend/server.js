const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = 5000;

const app = express();
app.use(cors());
app.use(morgan('short'));
app.use(express.json());

const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

app.get('/movies',function(req,res){
  knex
    .select('*')
    .from('movies')
    .then(data=>res.status(200).json(data))
    .catch(err => res.status(404).json({
      message:
        'The data you are looking for could not be found. Please try again'
    }))
})

app.patch('/movies/:id', function(req, res){
  let movieID = req.params.id;
  let bool = req.body.watched
  knex("movies").where("id", movieID)
    .update({
      watched: !bool,
    })
    .then(data => res.status(200).send("Updated movie!"))
    .catch(err => res.status(404).json(err))
})

app.post('/movies', function(req, res){
  let movieData = req.body;
  knex.insert(movieData)
    .into("movies")
    .then(data => res.status(200).send("Movie posted"))
    .catch(err => res.status(404).json(err))
})

app.delete('/movies/:id', function(req, res){
  let movieID = req.params.id;

  knex("movies").where("id", movieID)
    .del()
    .then(data => res.status(200).send("Deleted movie!"))
    .catch(err => res.status(404).json(err))
})


app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))
