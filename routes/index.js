const router = require('express').Router();
const {Crews, Voyages, Animals, AllAnimals, Contacts, Places} = require('../db/index.js');

/*index exports = {
    db,
    Crews - crew 80k
    Voyages - 30 log results
    Animals - 284 summary rows
    AllAnimals - 3000 individual entries
    Contacts - 1600 encounters
    Places - 800 sites
};*/


//nested under /api

//-------------GET ALL FOR EACH TABLE----------generic grabs for summary
router.get('/vessels', (req, res, next)=>{
	Voyages.findAll({})
		.then(voyageList=>{
			res.send(voyageList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/places', (req, res, next)=>{
	Places.findAll({})
		.then(placeList=>{
			res.send(placeList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/animals', (req, res, next)=>{
	Animals.findAll({})
		.then(animalSumList=>{
			res.send(animalSumList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/allanimals', (req, res, next)=>{
	AllAnimals.findAll({})
		.then(animalSumList=>{
			res.send(animalSumList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/contact', (req, res, next)=>{
	Contacts.findAll({})
		.then(contactList=>{
			res.send(contactList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/crew', (req, res, next)=>{
	Crews.findAll({})
		.then(contactList=>{
			res.send(contactList);
		})
		.catch(err=>{
			next(err);
		});

});

//-------------GET by vessel id FOR EACH TABLE----------generic grabs for summary

router.get('/vessels/:id', (req, res, next)=>{
	console.log(req.params.id);

	Voyages.findOne({
		where: {
			id : req.params.id
			}
		})
		.then(voyage => {
			res.send(voyage);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/places/:id', (req, res, next)=>{
	let id = req.params.id.replace('_', ' ');

	Places.findAll({
			where: {
				LogId : id
			}
		})
		.then(placeList=>{
			res.send(placeList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/animals/:id', (req, res, next)=>{
	let id = req.params.id.replace('_', ' ');

	Animals.findAll({
			where: {
				LogId : id
			}
		})
		.then(animalSumList=>{
			res.send(animalSumList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/allanimals/:id', (req, res, next)=>{
	let id = req.params.id.replace('_', ' ');

	AllAnimals.findAll({
			where: {
				LogId : id
			}
		})
		.then(animalSumList=>{
			res.send(animalSumList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/contact/:id', (req, res, next)=>{
	let id = req.params.id.replace('_', ' ');


	Contacts.findAll({
			where: {
					LogId : id
				}
		})
		.then(contactList=>{
			res.send(contactList);
		})
		.catch(err=>{
			next(err);
		});

});

router.get('/crew/:id', (req, res, next)=>{
	let id = req.params.id.replace('_', ' ');
	console.log('hit route:', id);

	Crews.findAll({
			where: {
					LogId : id
				}
		})
		.then(contactList=>{
			res.send(contactList);
		})
		.catch(err=>{
			next(err);
		});

});



module.exports = router;
