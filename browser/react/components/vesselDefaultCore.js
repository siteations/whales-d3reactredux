import React from 'react';
import ReactDOM from 'react-dom';

import PanelsVLeft from '../components/panelsVLeft';
import PanelsVRight from '../components/panelsVRight';
import Header from '../components/header.js';
import Summary from '../components/summary.js';
import D3Default from '../components/barDefault.js';
import { hashHistory } from 'react-router';

import {loadVoyages, selectVoyage, generalVoyage, extendVoyage, selectContacts, selectCrew, filterCrew, selectAnimals, selectPlaces} from '../action-creators/actions.js';

class VesselDefaultCore extends React.Component { // (props => {
	constructor(props) {
    super(props);
	}


	//rework animals for summary

	render(){
		var captureCnt=0;
		this.props.currentAnimals.forEach(animal=>{
			captureCnt += +animal.Captured;
		});

		return (

	        	<div>
		            <div className="row p15 aquaL fadein">
		              <div className="block-center col-lg-4 col-lg-offset-1 text-center p20 summary">
		                <Summary type= "contact" content={this.props.currentContacts.length} methods={this.props.methods.goToSubpage} />
		              </div>

		              <div className="block-center col-lg-2 text-center p20 summary">
		                <Summary type= "places" content={this.props.currentPlaces.length} methods={this.props.methods.goToDetail} />
		              </div>

		              <div className="block-center col-lg-4 text-center p20 summary">
		                <Summary type= "catch" content={captureCnt}  methods={this.props.methods.goToSubpage} />
		              </div>
		            </div>

		            <div className="row fadein p20 t45 block-center" id="d3-short">
		              <div className="block-center col-lg-10 col-lg-offset-1">
		              	<div className="block-center placeholder" id="d3Here">
		                	<D3Default stateO={this.props} stateA={this.props.stateA} methods={{labelShips: this.props.methods.labelShips, unlabelShips:this.props.methods.unlabelShips, goTo: this.props.methods.goTo }} />
		                </div>
		              </div>
		            </div>
		        </div>


		);
	} // render done
}

export default VesselDefaultCore;
