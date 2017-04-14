import React from 'react';
import ReactDOM from 'react-dom';

// import PanelsVLeft from '../components/panelsVLeft';
// import PanelsVRight from '../components/panelsVRight';
// import Header from '../components/header.js';
// import Summary from '../components/summary.js';
import D3Default from '../components/barDefault.js';
import D3Geo from '../components/geoDefault.js';
import { hashHistory } from 'react-router';

import {loadVoyages, selectVoyage, generalVoyage, extendVoyage, selectContacts, selectCrew, filterCrew, selectAnimals, selectPlaces} from '../action-creators/actions.js';

class VesselGeoCore extends React.Component { // (props => {
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
		            <div className="row p30 aquaL fadein">
		            	<div className="block-center col-lg-4 col-lg-offset-1 text-center p20 summary">
		              		<h5 className="white returns closeB" onClick={e => this.props.methods.goToSummary(e)}>to summary</h5>
		              	</div>
			              	<div className="block-center col-lg-2 text-center p20 summary">
			              		<h5 className="white returns closeB" onClick={e => this.props.methods.goToSubpage(e)}>to networks</h5>
			              	</div>
			              	<div className="block-center col-lg-4 text-center p20 summary">
			              		<h5 className="white returns closeB" onClick={e => this.props.methods.goToSubpage(e)}>to ecologies</h5>
			              	</div>
		            </div>

		            <div className="row fadein t75 block-center" id="d3-long">
		              <div className="block-center col-lg-10 col-lg-offset-1">
		                	<D3Geo stateO={this.props} stateA={this.props.stateA} methods={this.props.methods} />
		              </div>
		            </div>
		        </div>


		);
	} // render done
}

export default VesselGeoCore;
