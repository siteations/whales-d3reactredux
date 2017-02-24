import React from 'react';
import ReactDOM from 'react-dom';

import PanelsVLeft from '../components/panelsVLeft';
import PanelsVRight from '../components/panelsVRight';
import Header from '../components/header.js';
import Summary from '../components/summary.js';
import D3Default from '../components/barDefault.js';
import { hashHistory } from 'react-router';

import {loadVoyages, selectVoyage, generalVoyage, extendVoyage, selectContacts, selectCrew, filterCrew, selectAnimals, selectPlaces} from '../action-creators/actions.js';

class VesselCore extends React.Component { // (props => {
	constructor(props) {
    super(props);
    this.labelShips = this.labelShips.bind(this);
    this.unlabelShips = this.unlabelShips.bind(this);
    this.goTo = this.goTo.bind(this);
    this.state = {
    	contactLabel : '',
    };
  }

	//console.log('current vessel page:', props);
	// componentDidMount() { // for the local events on graphs

 //  }


	labelShips(e){
	    e.preventDefault();
	    this.setState({contactLabel: e.target.attributes.value.value});
	}

	unlabelShips(e){
	    e.preventDefault();
	    this.setState({contactLabel: '' });
	}

	goTo(e){
		console.dir(e.target.attributes.data.value);
		hashHistory.push(e.target.attributes.data.value);
	}


	//rework animals for summary

	render(){
		var captureCnt=0;
		this.props.currentAnimals.forEach(animal=>{
			captureCnt += +animal.Captured;
		});

		return (
		<div className="container-fluid blackB">
	      <img id="animBack" src="/img/vessels-bk0.jpg" />
	      <img id="animFront" src="/img/vessels-bk1.jpg" />
	      {/*<!--EVERYTHING ABOVE IS BACKGROUND ANIMATION, below is content that shifts...-->*/}
	        <div className="masterWindow">

	          <PanelsVLeft crew={this.props.currentCrew} />
	          <PanelsVRight animals={this.props.currentAnimals} />

	          <div className="block-center col-lg-10 col-lg-offset-1">

	            <Header type="Summary Statistics" vessel={this.props.currentVoyage}/>

	        {/* summary divs - all vessel summary pages*/}
	            <div className="row p20 aquaL fadein">
	              <div className="block-center col-lg-4 col-lg-offset-1 text-center p20 summary">
	                <Summary type= "contact" content={this.props.currentContacts.length}/>
	              </div>

	              <div className="block-center col-lg-2 text-center p20 summary">
	                <Summary type= "places" content={this.props.currentPlaces.length}/>
	              </div>

	              <div className="block-center col-lg-4 text-center p20 summary">
	                <Summary type= "catch" content={captureCnt}/>
	              </div>
	            </div>

	        {/* svg-d3 graph area - short - all subpages*/}

	            <div className="row fadein p20 t45 block-center" id="d3-short">
	              <div className="block-center col-lg-10 col-lg-offset-1">
	              	<div className="block-center placeholder" id="d3Here">
	                	<D3Default stateO={this.props} stateA={this.state} methods={{labelShips: this.labelShips, unlabelShips:this.unlabelShips, goTo: this.goTo }} />
	                </div>
	              </div>
	            </div>

	          </div>


	        </div>
	    </div>

		);
	} // render done
}

export default VesselCore;
