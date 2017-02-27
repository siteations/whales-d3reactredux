import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import VesselCore from '../components/vesselCore.js';

//each side panel should be a component - loads/links back from data
//the center should be three components - top bar/home links, the repeated summary divs (from state returns),

const mapStateToProps = (state => {
  return {
    voyages: state.voyages,
    currentVoyage : state.currentVoyage,
    otherVoyages : state.otherVoyages,
    currentContacts : state.currentContacts,
    currentCrew : state.currentCrew,
    currentAnimals : state.currentAnimals,
    currentPlaces : state.currentPlaces,
    MthPlaces : state.currentSortMthPlaces,
    MthAnimals : state.currentSortMthAnimals,
    baseGeography : state.baseGeography,
  };
});

const mapDispatchToProps = (dispatch => {
  return {
  };
});

const vesselContainer = connect(mapStateToProps, mapDispatchToProps)(VesselCore);

export default vesselContainer;
