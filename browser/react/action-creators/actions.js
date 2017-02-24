//constants
export const LOAD_VOYAGES= 'LOAD_VOYAGES';
export const SELECT_VOYAGE='SELECT_VOYAGE';
export const GENERAL_VOYAGE='GENERAL_VOYAGE';
export const EXTEND_VOYAGES='EXTEND_VOYAGES';
export const SELECT_CONTACTS='SELECT_CONTACTS';
export const SELECT_CREW='SELECT_CREW';
export const OTHER_CREW='OTHER_CREW';
export const SELECT_ANIMALS='SELECT_ANIMALS';
export const SELECT_ALL_ANIMALS='SELECT_ALL_ANIMALS';
export const SELECT_SORT_ANIMALS='SELECT_SORT_ANIMALS';
export const SELECT_YEAR_ANIMALS='SELECT_YEAR_ANIMALS';
export const SELECT_MTH_ANIMALS='SELECT_MTH_ANIMALS';
export const SELECT_PLACES='SELECT_PLACES';
export const SELECT_YEAR_PLACES='SELECT_YEAR_PLACES';
export const SELECT_MTH_PLACES='SELECT_MTH_PLACES';

//action-creators
export const loadVoyages = (voyages) => {
	return {
		type: LOAD_VOYAGES,
		voyages
	};

};

export const selectVoyage = (voyage) => {
	return {
		type: SELECT_VOYAGE,
		voyage
	};

};

export const detailVoyage = (voyage) => {

	  let start = voyage.Start;
	  let end = voyage.End;
	  var dates =[];
	  for (let i=+start; i<=+end+1; i++){dates.push(i);};

	voyage.Dates = dates;
	voyage.Length = dates.length;


	return dispatch => {
		dispatch(selectVoyage(voyage));
	};
};

export const generalVoyage = (general) => {
	return {
		type: GENERAL_VOYAGE,
		general
	};

};


export const selectContacts = (contacts) => {
	return {
		type: SELECT_CONTACTS,
		contacts
	};

};


export const selectAnimals = (animals) => {
	return {
		type: SELECT_ANIMALS,
		animals
	};

};

export const selectAllAnimals = (animals) => {
	return {
		type: SELECT_ALL_ANIMALS,
		animals
	};

};

export const selectSortAnimals = (animals) => {
	return {
		type: SELECT_SORT_ANIMALS,
		animals
	};

};

export const selectSortYrAnimals = (animals) => {
	return {
		type: SELECT_YEAR_ANIMALS,
		animals
	};

};

export const selectSortMthAnimals = (animals) => {
	return {
		type: SELECT_MTH_ANIMALS,
		animals
	};

};

export const selectPlaces = (places) => {
	return {
		type: SELECT_PLACES,
		places
	};
};

export const selectSortMthPlaces = (places) => {
	return {
		type: SELECT_MTH_PLACES,
		places
	};
};

export const selectSortYrPlaces = (places) => {
	return {
		type: SELECT_YEAR_PLACES,
		places
	};
};

export const extendVoyages = (voyagesEx) => {
	return {
		type: EXTEND_VOYAGES,
		voyagesEx
	};

};

export const selectCrew = (crew) => {
	return {
		type: SELECT_CREW,
		crew
	};

};

export const otherCrews = (crew) => {
	return {
		type: OTHER_CREW,
		crew
	};

};

export const filterCrew = (crew) => { //filters crew into this voyage and other voyages

	//insert into selectCrew...
	let currentCnt=0;
	let years =[];

	crew.forEach(member=>{
		if (+member.Fstart === +member.Dyear){
			member.voyage = 'current';
			currentCnt++;
		} else {
		if (years.indexOf(+member.Dyear)===-1){
				years.push(+member.Dyear);
			};
			member.voyage = 'other';
		}

	})

	console.log(years, crew[0].Fstart);
	var diff;
	if (currentCnt===0 && years.length===1){
		crew.forEach(member=> { member.voyage = 'current'; });
	} else if (currentCnt===0 && years.length > 1){
		diff = years.map(year=> {
			return Math.abs(+year - +crew[0].Fstart);
		});
		var year = years[diff.indexOf(Math.min(...diff))];

		crew.forEach(member=>{ if (year === +member.Dyear){
			member.voyage = 'current';
			//console.log(member.Fstart, member.Dyear);
			};
		});
	};

	var crewC = crew.filter(member=> {return member.voyage === 'current';});
	var crewOther = crew.filter(member=> {return member.voyage !== 'current';});

	return dispatch => {
		dispatch(selectCrew(crewC));
		dispatch(otherCrews(crewOther));
		dispatch(extendVoyages(years));
	};
};

export const filterAnimals = ((allanimals, duration) => { //filters all selected animals into monthly sums and dates out of 365

	const searchDate = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const years = [];
	for (let i=duration[0]; i<=duration[1]; i++){
		years.push(i);
	}

	var animalsSort={};
	var animalsByYear=[];
	var animalsByMonth=[];

	years.forEach(year => {
		animalsSort[year]=allanimals.filter(animal=>{
			return +animal.Year === year;
		});

		let months=[];
		for (let i=0; i<12; i++){months.push([]);}

		animalsSort[year].forEach(animal=>{

			for (let i=0; i<12; i++){
				if (searchDate[i] === animal.Month){
					animal.Date = +animal.Day+i*30;
					months[i].push(animal);
				}
			}
		});

		animalsByYear.push(animalsSort[year]);
		animalsSort[year] = months;
		animalsByMonth = animalsByMonth.concat(months);
	});

	return dispatch => {
		dispatch(selectSortYrAnimals(animalsByYear));
		dispatch(selectSortMthAnimals(animalsByMonth));
		dispatch(selectSortAnimals(animalsSort));
	};
});

export const filterPlaces = ((allanimals, duration) => { //filters all selected animals into monthly sums and dates out of 365

	const searchDate = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const years = [];
	for (let i=duration[0]; i<=duration[1]; i++){
		years.push(i);
	}

	var animalsSort={};
	var animalsByYear=[];
	var animalsByMonth=[];

	years.forEach(year => {
		animalsSort[year]=allanimals.filter(animal=>{
			return +animal.Year === year;
		});

		let months=[];
		for (let i=0; i<12; i++){months.push([]);}

		animalsSort[year].forEach(animal=>{

			for (let i=0; i<12; i++){
				if (searchDate[i] === animal.Month){
					animal.Date = +animal.Day+i*30;
					months[i].push(animal);
				}
			}
		});

		animalsByYear.push(animalsSort[year]);
		animalsSort[year] = months;
		animalsByMonth = animalsByMonth.concat(months);
	});

	return dispatch => {
		dispatch(selectSortYrPlaces(animalsByYear));
		dispatch(selectSortMthPlaces(animalsByMonth));
	};
});

//reducers

const initState = {
	voyages : [],
	currentVoyage : {},
	generalVoyage :false,
	otherVoyages : [],
	currentContacts : [],
	currentCrew : [],
	otherCrews : [],
	currentAnimals : [],
	currentAllAnimals: [],
	currentSortYrAnimals: [],
	currentSortMthAnimals: [],
	currentSortAnimals: {},
	currentPlaces : [],
	currentSortYrPlaces: [],
	currentSortMthPlaces: [],
};

export const vesselReducer = (prevState = initState, action) => {
	let newState = Object.assign({}, prevState);

	switch(action.type){

	case LOAD_VOYAGES:
		newState.voyages = action.voyages;
		break;

	case SELECT_VOYAGE:
		newState.currentVoyage = action.voyage;
		break;

	case GENERAL_VOYAGE:
		newState.generalVoyage = action.general;
		break;

	case EXTEND_VOYAGES:
		newState.otherVoyages = action.voyagesEx;
		break;

	case SELECT_CONTACTS:
		newState.currentContacts = action.contacts;
		break;

	case SELECT_CREW:
		newState.currentCrew = action.crew;
		break;

	case OTHER_CREW:
		newState.otherCrews = action.crew;
		break;

	case SELECT_ANIMALS:
		newState.currentAnimals = action.animals;
		break;

	case SELECT_ALL_ANIMALS:
		newState.currentAllAnimals = action.animals;
		break;

	case SELECT_SORT_ANIMALS:
		newState.currentSortAnimals = action.animals;
		break;

	case SELECT_YEAR_ANIMALS:
		newState.currentSortYrAnimals = action.animals;
		break;

	case SELECT_MTH_ANIMALS:
		newState.currentSortMthAnimals = action.animals;
		break;

	case SELECT_PLACES:
		newState.currentPlaces = action.places;
		break;

	case SELECT_YEAR_PLACES:
		newState.currentSortYrPlaces = action.places;
		break;

	case SELECT_MTH_PLACES:
		newState.currentSortMthPlaces = action.places;
		break;

	default:
		return prevState;
	}

	return newState;

};


