//-----------ONLY FOR SEEDING!-------------------
//const seed = require('./db/seed.js');

//-----------ALL OTHER-------------------
const db = require('./db/index.js').db;
const Sequelize = require('sequelize');

const express = require('express');
const fs = require('fs');
const Promise = require('bluebird');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./routes/index.js');

const fsP = Promise.promisify(fs.readFile);

//const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./browser/'));
app.use(express.static('./public/'));
app.use(express.static('./public/stylesheets/'));
app.use(express.static('./public/img/'));
//app.use(express.static('./public/geojson/'));
app.use('/jquery', express.static('./node_modules/jquery/dist'));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

//add more routes/router later....

app.use('/api', router);
app.use('/geojson/:file', (req, res, next) => {
      fsP(`./public/geojson/${req.params.file}`)
        .then(geojson =>{
          res.send(geojson);
        })
        .catch(err=>{
          next(err);
        });
});


//-----------ERROR HANDLING-------------------

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use('/', (err, req, res, next) =>{
    console.log(err);
    var error={
        'message': err.message,
        'status':err.status,
        'stack':err.stack,
    }
    //res.send(error);
    res.render('error.html', {error:error});
});

//-----------DATABASE & CONNECTION SYNC-------------------

var database = db.sync() // for queries only...
.then(()=> {

	app.listen(process.env.PORT || 3000, function(){
  console.log('listening on', process.env);
});
});


