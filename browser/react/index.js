import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect, IndexRoute } from 'react-router';
//--------------------REDUX--------------------
import { Provider } from 'react-redux';
import store from '../store.js';
//--------------------AXIOS & d3--------------------
import axios from 'axios';
import * as d3 from 'd3';
//--------------------MISC--------------------
import jquery from 'jquery';
import bootstrap from 'bootstrap';

//--------------------containers and components---------------
import startContainer from './containers/startContainer.js';
import vesselContainer from './containers/vesselContainer.js';
import VesselGeoCore from './components/vesselGeoCore.js';
import VesselDefaultCore from './components/vesselDefaultCore.js';
import vesselNetContainer from './containers/vesselNetContainer.js';

//--------------------action-creators--------------------------
import {loadVoyages, selectVoyage, detailVoyage, generalVoyage, extendVoyage, setbaseGeo, selectContacts, selectCrew, filterCrew, filterPlaces, selectAnimals, filterAnimals, selectAllAnimals, selectPlaces} from './action-creators/actions.js';

//----------promisify-------------------------



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
	let voyageId;
	if (nextRouterState.params.id !== undefined){
		voyageId = nextRouterState.params.id;
	} else { voyageId = 1; };

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
			const geography = axios.get('/geojson/110m_land.json');


			return Promise
			.all([pVoyage, sCrew, sContacts, sPlaces, sAnimals, sAllAnimals, geography])
			.then(responses => responses.map(r => r.data))
			.then(([voyages, crew, contacts, places, animals, allanimals, geography]) => {

				store.dispatch(filterCrew(crew));
				store.dispatch(selectContacts(contacts));
				store.dispatch(selectPlaces(places));
				store.dispatch(filterPlaces(places, duration));
				store.dispatch(selectAnimals(animals));
				store.dispatch(filterAnimals(allanimals, duration));
				store.dispatch(selectAllAnimals(allanimals));
				store.dispatch(setbaseGeo(geography));
				store.dispatch(loadVoyages(voyages));
			});
	});

};



ReactDOM.render(
  <Provider store={store}>
		<Router history={hashHistory}>
			{/*<Route path='/' component={startContainer} onEnter={onIndexEnter} />*/}
			<Route path='/' component={vesselContainer} onEnter={onVesselEnter} >
				<IndexRedirect to="/vessel//summary" />
				<Route path='/vessel/:id/summary' component={VesselDefaultCore}  />
				<Route path='/vessel/:id/geographies' component={VesselGeoCore}  />
			</Route>
			<Route path='/vessel/:id' component={vesselContainer} onEnter={onVesselEnter} >
				<IndexRedirect to="/vessel/:id/summary" />
				<Route path='/vessel/:id/summary' component={VesselDefaultCore}  />
				<Route path='/vessel/:id/geographies' component={VesselGeoCore}  />
			</Route>
	  </Router>
  </Provider>,
  document.getElementById('app')
);
