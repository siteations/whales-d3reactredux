import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
//--------------------REDUX--------------------
import { Provider } from 'react-redux';
import store from '../store.js';
//--------------------AXIOS--------------------
import axios from 'axios';
//--------------------MISC--------------------
import jquery from 'jquery';
import bootstrap from 'bootstrap';

//--------------------containers and components---------------
import startContainer from './containers/startContainer.js';
import vesselContainer from './containers/vesselContainer.js';
import vesselGeoContainer from './containers/vesselGeoContainer.js';
import vesselNetContainer from './containers/vesselNetContainer.js';

//--------------------action-creators--------------------------
import {loadVoyages, selectVoyage, detailVoyage, generalVoyage, extendVoyage, selectContacts, selectCrew, filterCrew, filterPlaces, selectAnimals, filterAnimals, selectAllAnimals, selectPlaces} from './action-creators/actions.js';


//--------------------ON ENTER ACTIONS--------------------------

const onIndexEnter = () => {

	const pVoyages = axios.get('/api/vessels')
					.then(responses => {
						return responses.data;
					})
				    .then((voyages) => {
				      	store.dispatch(loadVoyages(voyages));
				    });
};

const onVesselEnter = (nextRouterState) => {
	const voyageId = nextRouterState.params.id;

	const sVoyage = axios.get(`/api/vessels/${voyageId}`)
		.then(response => response.data)
	    .then((voyage) => {
	    	const duration =[voyage.Start, voyage.End];
	    	voyage.LogId= voyage.LogId.replace(' ', '_');
	      	store.dispatch(detailVoyage(voyage));

			const pVoyage = axios.get('/api/vessels');
			const sCrew = axios.get(`/api/crew/${voyage.LogId}`);
			const sContacts = axios.get(`/api/contact/${voyage.LogId}`);
			const sPlaces = axios.get(`/api/places/${voyage.LogId}`);
			const sAnimals = axios.get(`/api/animals/${voyage.LogId}`);
			const sAllAnimals = axios.get(`/api/allanimals/${voyage.LogId}`);

			return Promise
			.all([pVoyage, sCrew, sContacts, sPlaces, sAnimals, sAllAnimals])
			.then(responses => responses.map(r => r.data))
			.then(([voyages, crew, contacts, places, animals, allanimals]) => {

				store.dispatch(filterCrew(crew));
				store.dispatch(selectContacts(contacts));
				store.dispatch(selectPlaces(places));
				store.dispatch(filterPlaces(places, duration));
				store.dispatch(selectAnimals(animals));
				store.dispatch(filterAnimals(allanimals, duration));
				store.dispatch(selectAllAnimals(allanimals));
				store.dispatch(loadVoyages(voyages));
			});
	});

};



ReactDOM.render(
  <Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={startContainer} onEnter={onIndexEnter} />
			<Route path='/vessel/:id' component={vesselContainer} onEnter={onVesselEnter} >
				<Route path='/geographies' component={vesselGeoContainer} />
				<Route path='/networks' component={vesselNetContainer} />
			</Route>
	  </Router>
  </Provider>,
  document.getElementById('app')
);
