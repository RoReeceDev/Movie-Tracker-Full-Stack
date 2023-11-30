const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { ObjectID } = require('bson');
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 4545
var db, collection;

const url = "mongodb+srv://roreecedev:moviedev@cluster4.4svoooe.mongodb.net/MovieRankings?retryWrites=true&w=majority";
const dbName = "MovieRankings";

app.listen(PORT, "0.0.0.0", () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('movies').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', { movies: result })
  })
})



app.post('/movies', (req, res) => {
  db.collection('movies').insertOne({ title: req.body.title, director: req.body.director, coverImg: req.body.image, stream: req.body.stream, releaseYear: req.body.releaseYear, watched: false, watching: false, toWatch: true, dropped: false }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})



app.put('/movies/towatch', (req, res) => {
  console.log(req.body)
  db.collection('movies').findOneAndUpdate({ title: req.body.title, director: req.body.director }, { $set: { watched: false, watching: false, toWatch: true, dropped: false  } })
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


app.put('/movies/watched', (req, res) => {
  console.log(req.body)
  db.collection('movies').findOneAndUpdate({ title: req.body.title, director: req.body.director }, { $set: { watched: true, watching: false, toWatch: false, dropped: false  } })
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.status(500).send(error);
    });
})

app.put('/movies/dropped', (req, res) => {
  console.log(req.body)
  db.collection('movies').findOneAndUpdate({ title: req.body.title, director: req.body.director }, { $set: { watched: false, watching: false, toWatch: false, dropped: true  } })
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});


app.put('/movies/watching', (req, res) => {
  console.log(req.body)
  db.collection('movies').findOneAndUpdate({ title: req.body.title, director: req.body.director }, { $set: { watched: false, watching: true, toWatch: false, dropped: false  } })
    .then(result => {
      res.send(result);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.delete('/movies', (req, res) => {
  db.collection('movies').findOneAndDelete({ title: req.body.title, director: req.body.director }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Movie deleted!')
  })
})
