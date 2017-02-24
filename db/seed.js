const fs = require('fs');
const Promise = require('bluebird');

//const db = require('./db.js');
const db = require('./index.js').db;
const Crews = require('./crews.js');
const Voyages = require('./voyages');
const Animals = require('./animals');
const Allanimals = require('./allanimals');
const Places = require('./places');
const Contacts = require('./contacts');


//parsing from buffer
const buffString = file => file.toString('utf8');

const readD = Promise.promisify(fs.readdir);
const readF = Promise.promisify(fs.readFile);

//------------reading in directory and files-----------------
const logs ='./data/sLogs/';
const crew ='./data/sCrews/';
const locations = './data/locations.txt';

const fileLogs=readD(logs);
const fileCrews=readD(crew);
const fileLocat=readF(locations);

var database = db.sync({force:true}); // for seeding only...
database.then(()=> { console.log('synced, top-confirmation'); });

//------------parsing functions to re-order data-----------------

// function to parse log lines into objects for db
// one for animals, one for contacts, places later

function logPSubjects(composite, logN){

    var subjects=[];

    if (composite.startsWith('Subject Entries')){
        composite = composite.replace('Subject Entries', '');

        var series = composite.split(/(\w{3,}\.\s)/g);
        series.forEach((entry,i) => {
            if (i%2 !==0) { subjects.push({LogId: logN.trim(), Subject:(series[i-1]+entry).trim().slice(0,-1)}) }
        });

        return subjects;

    }


}

function logPAnAll(composite, logN){

    var animalType = ['Blackfish', 'Grampuses', 'Bowhead whales', 'Fish', 'Blue whales', 'Bowhead (Polar) whales', 'Finback whales', 'Humpback whales', 'Norwegian whales', 'Sperm whales','Gray whales', 'Killer whales', 'Right whales', 'Unspecified whales', 'Porpoises', 'Puffins', 'Misc. creatures', 'Walruses' ];

    //returns object which should be equivalent to a row
    var animalArr = animalType.map(animalN => {

        if (composite.startsWith(animalN)){ // each animal
            var sepAnimals=[];
            var mAnimal={};

            var entries = composite.split(';');

            var year=0;
            var splDate = /( Jan| Feb| Mar| Apr| May| Jun| Jul| Aug| Sep| Oct| Nov| Dec)/g;
            var splDates = /( Jan| Feb| Mar| Apr| May| Jun| Jul| Aug| Sep| Oct| Nov| Dec| \(cau)/g;


            entries.forEach(entry =>{
                var mAnimal={}
                    mAnimal.LogId = logN.trim();

                    var type = '';

                   if (animalN !== 'Misc. creatures') {
                    type=animalN;
                   } else {
                    type = entry.split(splDates)[0].trim();
                        if (type.startsWith('Misc. creatures')){
                            type = type.split(': ')[1];
                        }
                   }

                    mAnimal.Type = type.trim();

                    mAnimal.Page = entry.match(/(p. \d*)/g) ? entry.match(/(p. \d*)/g)[0].split(' ')[1] : null;
                    mAnimal.Dead = entry.match('dead whale') ? entry.match('dead whale').length : 0 ;

                    var barrels = entry.match(/(\d* barrels)/g) ? entry.match(/(\d* barrels)/g)[0].match(/(\d*)/g)[0] : 0;

                    mAnimal.BarrelsRendered = barrels;

                    var captures =  entry.match(/(caught\s\d)|(caught)/g);
                    var ccnt=0;

                    if (captures){
                       captures.forEach(element => {
                            if (element.split(' ').length>1) { ccnt+= +element.split(' ')[1]
                    } else { ccnt++ };}); };


                    mAnimal.Captured = ccnt || 0 ;


                entry = entry.replace(/(p. \d*)/g, '').replace('(dead whale)', '').replace(/(caught\s\d)|(caught)/g,' ').replace(',', '').replace('&','').replace('(seen unless otherwise noted)', '').replace('(', '').replace(')', '');

                    mAnimal.Month = entry.match(splDate) ? entry.match(splDate)[0].trim() : null;
                    mAnimal.Day = entry.match(/(\w{3}\s\d+)/g) ? entry.match(/(\w{3}\s\d+)/g)[0].split(' ')[1] : null;
                    mAnimal.Year = year = entry.match(/(\d{4})/g) ? entry.match(/(\d{4})/g)[0] : year;

                    //mAnimal.DaysPlus = entry.replace(/(\w{3}\s\d+)/g, '').replace(/(\d{4})/g, '').trim().split(' ');


                sepAnimals.push(mAnimal);

             })

         }

        //console.log('sepAn: ', sepAnimals);
        return sepAnimals;

    })


    animalArr = animalArr.filter(item => item!==undefined);
    //console.log('arrAn: ', animalArr);
    if (animalArr.length>0){ return animalArr[0]};

}

function logPAn(composite, logN){

    var animalType = ['Blackfish', 'Grampuses', 'Bowhead whales', 'Fish','Blue whales','Bowhead (Polar) whales', 'Finback whales', 'Humpback whales', 'Norwegian whales', 'Sperm whales','Gray whales', 'Killer whales', 'Right whales', 'Unspecified whales', 'Porpoises', 'Puffins','Walruses', 'Misc. creatures'];

    //returns object which should be equivalent to a row
    var animalArr = animalType.map(animalN => {
        var animals=[];


        if (composite.startsWith(animalN)){ // each animal
            var animal={};

            var entries = composite.split(';');
            var captures = composite.match(/(caught\s\d)|(caught)/g);
            var barrels = composite.match(/(\d* barrels)/g);
            var ccnt=0;
            var bcnt=0;

            if (captures){
               captures.forEach(entry => {
                    if (entry.split(' ').length>1) { ccnt+= +entry.split(' ')[1]
            } else { ccnt++ };}); };

            if (barrels){
               barrels.forEach(entry => {
                    bcnt+= +entry.split(' ')[0];
                });
            };

            animal.LogId = logN.trim();
            animal.Type = animalN;
            animal.Seen = entries.length;
            animal.Captured = ccnt;
            animal.BarrelsRendered = bcnt;

        animals.push(animal);
        //console.log(animals); // single row in array to concat...
        };

        if (animals.length>0){ return animals};

    }); // animals done

    //console.log('getting here: parseAnimals2');
    animalArr = animalArr.filter(item => item!==undefined);
    if (animalArr.length>0){ return animalArr[0]};

}; // animals parsed!


function logPPlace(composite, logN, geoRows){ // single line = array of one or more rows of contact entries

    if (composite.startsWith('Places represented')){
        var visits=[];

        var placeArr=composite.split(':')[1].split(';'); //each place series (may be multiple visits)
        //console.log(placeArr, placeArr.length);
        var year=0;

        var placeRows=placeArr.forEach(row =>{
            row = row.trim();
            var placeVisits=[];

            var splitIndex = row.search(/(, \D{3}\s)/g);
            var splDate = /( Jan| Feb| Mar| Apr| May| Jun| Jul| Aug| Sep| Oct| Nov| Dec)/g;
            var searchDate = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            var place = row.split(splDate)[0].trim();

            var location=[];
            geoRow = geoRows.map(row=>{
                return row.split(',');
            });

            // will need to reseed after finishing geocoding - 80% corrected
            geoRow.forEach(row=>{
                if (place.trim()===row[0]){
                    location[0]=row[1];
                    location[1]=row[2];
                }
            });


            while (splitIndex !== -1){

                        var extract = row.slice(0,splitIndex); // stuff to work on
                        row = row.slice(splitIndex+2);
                        splitIndex = row.search(/(, \D{3}\s)/g); //for next loop


                        var page = extract.split('p. ')[1];
                        if (page && page.split(' ')[0]){ page = page.split(' ')[0];};
                        if (page && ( page[page.length-1] === '.' || page[page.length-1] === ',')){ page = page.slice(0,-1);};


                        var longdate = extract.split(' p. ')[0].split(' ');
                            var monthI=0;
                            searchDate.forEach(month=>{
                                if (longdate.indexOf(month) !== -1){
                                    monthI = longdate.indexOf(month)
                                }
                            });

                            year = +longdate[monthI+2] || year;
                            var day = longdate[monthI+1];
                            if (day && ( day[day.length-1] === '.' || day[day.length-1] === ',')){ day = day.slice(0,-1);};

                            var month = longdate[monthI];

                        //console.log({ LogId: logN, Place: place, Page: page, Year: year, Month: month, Day: day, Location: location });
                        placeVisits.push({ LogId: logN.trim(), Place: place, Page: page, Year: year, Month: month, Day: day, Location: location });
                    }

                    //if (splitIndex === -1){

               var longdate = row.split(' p. ')[0].split(' ');
                //console.log(logN, longdate);

                var monthI=0;
                searchDate.forEach(month=>{
                    if (longdate.indexOf(month) !== -1){
                        monthI = longdate.indexOf(month)
                    }
                });

                year = +longdate[monthI+2] || year;
                var day = longdate[monthI+1];
                if (day && ( day[day.length-1] === '.' || day[day.length-1] === ',')){ day = day.slice(0,-1);};

                var month = longdate[monthI];

                var page = row.split('p. ')[1];
                if (page && page.split(' ')[0]){ page = page.split(' ')[0];};
                if (page && ( page[page.length-1] === '.' || page[page.length-1] === ',')){ page = page.slice(0,-1);};


            placeVisits.push({ LogId: logN.trim(), Place: place, Page: page, Year: year, Month: month, Day: day, Location: location });
            visits=visits.concat(placeVisits);
        });

        return visits;
    };

}; // places parsed!

function logPCon(composite, logN){ // single line = array of one or more rows of contact entries

    if (composite.startsWith('Ships Spoken')){
        var contactArr=composite.split(':')[1].split(')');

        var contactRows=contactArr.map(row =>{
            row.trim();

            var internal = row.split(/\sof\s|\s\(/g);
            if (internal[2]===undefined){ internal[2] = internal[1]; internal[1]=null };

            return { LogId: logN.trim(), Vessel: internal[0].trim(), Port: internal[1], Rig: internal[2]};
        });

        return contactRows;
    };

}; // contacts parsed!

//------------------- logs to read and parse (async)---------------
//SHIP LOGS

var ships=fileLocat.then((geocodes)=> {

   return fileLogs.then((fileList)=> {
    //this file list is then iterable to read each file's contents
    geocodes = buffString(geocodes);
    geoRows=geocodes.split('\n');

    console.log(fileList);
    //console.log(geocodes);

        return contents=Promise.map(fileList, fileName => {
            return readF(logs+'/'+fileName);
            });
    })
    .then(results => {

    var textArr = results.map((file) => {
                return buffString(file);
        });
    textArr.shift();//.DS files
    console.log(textArr.length);
    var uniquePlace=[];


    let logParse = textArr.map(log =>{
        var lines=log.split('\n');
        var logN =lines[0].split(',')[1];
        //console.log('got here: ', logN);
        var voyage = {}; //make row(s) for voyage table-model
            voyage.LogId = logN.trim();
            voyage.Vessel = lines[0].split('(')[0].trim();
            voyage.Rig = lines[0].match(/\w*(?=\))/g)[0];
            voyage.Start = +(lines[2].split(',')[1].trim());
            voyage.End = +(lines[2].split(',')[2].trim());


        var longLAn=[]; //make row(s) for animals table-model
        var longLAnAll=[];
        var longLCon=[]; //make row(s) for contact table-model
        var longLPlace=[]; //make row(s) for places table-model
        var longLSub=[];
        //var longLPlc=[]; //make row(s) for places table-model


        for (let i=0; i<lines.length-1; i++){
            let composite='';
            //use empty as while break
            while (lines[i] !== '' && i<lines.length-1){
                composite+=lines[i]+' ';
                i++;
            }
            //subjects parsed
            if (logPSubjects(composite,logN)!==undefined) {
                longLSub=longLSub.concat(logPSubjects(composite,logN));
            };

            //animalsCondensed parsed
            if (logPAn(composite,logN)!==undefined) {
                longLAn=longLAn.concat(logPAn(composite,logN));
            };

            //animalsExpanded parsed
            if (logPAnAll(composite,logN)!==undefined) {
                longLAnAll=longLAnAll.concat(logPAnAll(composite,logN));
                //console.log(longLAnAll);

            };

            //contact parsed
            if (logPCon(composite,logN)!==undefined) {
                longLCon=longLCon.concat(logPCon(composite,logN));
            };
            //places parsed
            if (logPPlace(composite,logN,geoRows)!==undefined) {
                longLPlace=longLPlace.concat(logPPlace(composite,logN,geoRows));
            };
        };

        //PRE-GEOCODING ONLY
        // longLPlace.forEach(entry => {
        //     if (uniquePlace.indexOf(entry.Place)===-1){
        //         uniquePlace.push(entry.Place);
        //     }
        // });

        //console.log({ voyage: voyage , animals: longLAn, animalAll: longLAnAll, contacts: longLCon, places:longLPlace, subjects: longLSub  });

        return { voyage: voyage , animals: longLAn, animalAll: longLAnAll, contacts: longLCon, places:longLPlace, subjects: longLSub  };
    });

    //console.log(logParse);
    return logParse;

 });

}).catch(console.log);

// crew-lists to read and parse (async)---------------------------
// CREWLISTS

var sailors = fileCrews.then((fileList)=> {
        return contents=Promise.map(fileList, fileName => {
            return readF(crew+'/'+fileName);
            });
        })
    .then(results => {
        var crewRows = buffString(results[0]).split('\n');

        var headKeys=crewRows.shift().split(',');
        //LastName,FirstName,Vessel,Rig,Departure,Rank

        //leaving duplicates use UNIQUE/DISTINCT later - queries
        //split approximateDeparture into distinct dates later -
        //
        const peps = crewRows.map(row => {
            var person = row.split(',');
            var pFormat={};
            person.forEach((element,i)=>{
                pFormat[headKeys[i]]=element;
            });
            return pFormat;
        });

        return peps; // an array of row objects (person as obj)
     }).catch(console.log);

//could then pass either into a Promise.map to create entry....

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////


database.then(()=>{
    console.log('db synched, adding models');


//VOYAGES CREATED on
    const creatingVoyage = ships.then(logs => {
        return Promise.map(logs, log =>{
            return Voyages.create(log.voyage);
        });
    }).then((voyages)=>{
        //console.log('hello', voyages)



//------ANIMALS CONDENSED CREATED---------------------------------------------------

            const creatingAnimals = ships.then(logs => {
                logs.forEach(log => {
                    return Promise.map(log.animals, animal =>{

                        return Animals.create(animal);

                    }).catch(console.log); //promise.map

                }); // log forEach

            }).then(()=>{console.log('animals started');}).catch(console.log); // general catch

//------ANIMALS ALL CREATED---------------------------------------------------

            const creatingAnimalALL = ships.then(logs => {
                logs.forEach(log => {
                    return Promise.map(log.animalAll, animal =>{

                        return Allanimals.create(animal);

                    }).catch(console.log); //promise.map

                }); // log forEach

            }).then(()=>{console.log('allanimals started');}).catch(console.log); // general catch

//------CONTACTS CREATED--------------------------------------------------------------------


            const creatingContacts = ships.then(logs => {
                logs.forEach(log => {
                    return Promise.map(log.contacts, contact => {

                        return Contacts.create(contact);

                    }).catch(console.log); // promise.map
                }); // log forEach

            }).then(()=>{console.log('contacts started');}).catch(console.log); // general catch

//------PLACES CREATED--------------------------------------------------------------------

            const creatingPlaces = ships.then(logs => {

                logs.forEach(log => {

                    return Promise.map(log.places, place =>{

                        return Places.create(place);

                    }).catch(console.log); // promise.map
                }); // log forEach

            }).then(()=>{console.log('places started');}).catch(console.log); // general catch

//------CREW CREATED--------------------------------------------------------------------
        const creatingCrew = sailors.then(Crew => {
            return Promise.map(Crew, crewMember =>{

                var voy; // this should be a class method, but it really won't work!?
                voyages.forEach(voyage => {
                    if (voyage.dataValues.Vessel === crewMember.Vessel){
                        crewMember.LogId = voyage.dataValues.LogId;
                        crewMember.Fstart = voyage.dataValues.Start;
                        voy=voyage;
                    }
                });

            return Crews.create(crewMember)
                            .then(crewMem=>{
                                crewMem.setVoyage(voy);
                            });
            });

        }).then(()=>{console.log('crews started');}).catch(console.log);

//------FINAL CATCH--------------------------------------------------------------------

    });


}).catch(console.log);


module.exports = {};

