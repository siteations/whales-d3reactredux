import React from 'react';
import ReactDOM from 'react-dom';

import PanelsVLeft from '../components/panelsVLeft';
import PanelsVRight from '../components/panelsVRight';
import Header from '../components/header.js';
import Summary from '../components/summary.js';
import D3Default from '../components/barDefault.js';
import D3Geo from '../components/geoDefault.js';
import { hashHistory } from 'react-router';

import {loadVoyages, selectVoyage, generalVoyage, extendVoyage, selectContacts, selectCrew, filterCrew, selectAnimals, selectPlaces} from '../action-creators/actions.js';

class VesselCore extends React.Component { // (props => {
	constructor(props) {
    super(props);
    this.labelShips = this.labelShips.bind(this);
    this.unlabelShips = this.unlabelShips.bind(this);
    this.goTo = this.goTo.bind(this);
    this.goToSubpage = this.goToSubpage.bind(this);
    this.state = {
    	contactLabel : '',
    	types: 'Summary',
    };
  }


	labelShips(e){
	    e.preventDefault();
	    this.setState({contactLabel: e.target.attributes.value.value});
	}

	unlabelShips(e){
	    e.preventDefault();
	    this.setState({contactLabel: '' });
	}

	goTo(e){
		hashHistory.push(e.target.attributes.data.value);
	}

	goToSubpage(e){
		let dest = e.target.innerText.split(' ')[1];
		let destination = dest[0].toUpperCase() + dest.slice(1);
		this.setState({types: destination});
		console.log(destination);
		//hashHistory.push(e.target.attributes.value.value);
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
	      <img id="animWhale0" src="/img/vessels-whale0.png" />
	      <img id="animWhale1" src="/img/vessels-whale1reflect.png" />
	      <img id="animWhale2" src="/img/vessels-whale0.png" />
	      {/*<!--EVERYTHING ABOVE IS BACKGROUND ANIMATION, below is content that shifts...-->*/}
	        <div className="masterWindow">

	          <PanelsVLeft crew={this.props.currentCrew} />
	          <PanelsVRight animals={this.props.currentAnimals} />

	          <div className="block-center col-lg-10 col-lg-offset-1">

	            <Header type={this.state.types} vessel={this.props.currentVoyage}/>

	        {/* summary divs - all vessel summary pages*/}
	        { this.state.types==='Summary' &&

	        	<div>
		            <div className="row p15 aquaL fadein">
		              <div className="block-center col-lg-4 col-lg-offset-1 text-center p20 summary">
		                <Summary type= "contact" content={this.props.currentContacts.length} methods={this.goToSubpage} />
		              </div>

		              <div className="block-center col-lg-2 text-center p20 summary">
		                <Summary type= "places" content={this.props.currentPlaces.length} methods={this.goToSubpage} />
		              </div>

		              <div className="block-center col-lg-4 text-center p20 summary">
		                <Summary type= "catch" content={captureCnt}  methods={this.goToSubpage} />
		              </div>
		            </div>

		            <div className="row fadein p20 t45 block-center" id="d3-short">
		              <div className="block-center col-lg-10 col-lg-offset-1">
		              	<div className="block-center placeholder" id="d3Here">
		                	<D3Default stateO={this.props} stateA={this.state} methods={{labelShips: this.labelShips, unlabelShips:this.unlabelShips, goTo: this.goTo }} />
		                </div>
		              </div>
		            </div>
		        </div>
		    }
		    { this.state.types!=='Summary' &&

	        	<div>
		            <div className="row p30 aquaL fadein">
		            	<div className="block-center col-lg-4 col-lg-offset-1 text-center p20 summary">
		              		<h5 className="white returns closeB" onClick={e => this.goToSubpage(e)}>to summary</h5>
		              	</div>
		              	{ this.state.types==='Geographies' &&
			              <span>
			              	<div className="block-center col-lg-2 text-center p20 summary">
			              		<h5 className="white returns closeB" onClick={e => this.goToSubpage(e)}>to networks</h5>
			              	</div>
			              	<div className="block-center col-lg-4 text-center p20 summary">
			              		<h5 className="white returns closeB" onClick={e => this.goToSubpage(e)}>to ecologies</h5>
			              	</div>
			              </span>
		              	}
		              	{ this.state.types==='Networks' &&
			              <span>
			              	<div className="block-center col-lg-2 text-center p20 summary">
			              		<h5 className="white returns closeB" onClick={e => this.goToSubpage(e)}>to geographies</h5>
			              	</div>
			              	<div className="block-center col-lg-4 text-center p20 summary">
			              		<h5 className="white returns closeB" onClick={e => this.goToSubpage(e)}>to ecologies</h5>
			              	</div>
			              </span>
		              	}
		              	{ this.state.types==='Ecologies' &&
			              <span>
			              	<div className="block-center col-lg-2 text-center p20 summary">
			              		<h5 className="white returns closeB" onClick={e => this.goToSubpage(e)}>to geographies</h5>
			              	</div>
			              	<div className="block-center col-lg-4 text-center p20 summary">
			              		<h5 className="white returns closeB" onClick={e => this.goToSubpage(e)}>to networks</h5>
			              	</div>
			              </span>
		              	}
		            </div>

		            <div className="row fadein t45 block-center" id="d3-long">
		              <div className="block-center col-lg-10 col-lg-offset-1">
		                	<D3Geo stateO={this.props} stateA={this.state} methods={{labelShips: this.labelShips, unlabelShips:this.unlabelShips, goTo: this.goTo }} />
		              </div>
		            </div>
		        </div>
		    }

	          </div>


	        </div>
	    </div>

		);
	} // render done
}

export default VesselCore;
