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
    this.labelSite = this.labelSite.bind(this);
    this.unlabelSite = this.unlabelSite.bind(this);
    this.labelSites = this.labelSites.bind(this);
    this.unlabelSites = this.unlabelSites.bind(this);
    this.goTo = this.goTo.bind(this);
    this.goToSubpage = this.goToSubpage.bind(this);
    this.goToSummary = this.goToSummary.bind(this);
    this.goToDetail = this.goToDetail.bind(this);
    this.state = {
    	contactLabel : '',
    	types: 'Summary',
    	siteLabel: {},
    	siteLabels : [],
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

	labelSites(e){
	    e.preventDefault();
	    let placeArray = e.target.attributes.data.value.split(',');
	    let sites=[];
	    placeArray.forEach(place=>{
	    	this.props.currentPlaces.forEach(site=>{
	    		if (place === site.Place){
	    			sites.push(site);
	    		}

	    	});
	    });
	    this.setState({contactLabel: e.target.attributes.value.value});
	    this.setState({siteLabels: sites});
	}

	unlabelSites(e){
	    e.preventDefault();
	    this.setState({contactLabel: '' });
	    this.setState({siteLabels: [] });
	}

	labelSite(e){
	    e.preventDefault();
	    //console.dir(e.target.attributes);
	    let currentSite ={
	    	x: e.target.attributes.cx.value,
	    	y: e.target.attributes.cy.value,
	    	name: e.target.attributes.value.value
	    };
	    //attributes.cx.value, cy.value, value.value
	    this.setState({ siteLabel: currentSite });
	}

	unlabelSite(e){
	    e.preventDefault();
	    this.setState({siteLabel: {} });
	}

	goTo(e){
		hashHistory.push(e.target.attributes.data.value);
	}

	goToSubpage(e){
		let dest = e.target.innerText.split(' ')[1];
		let destination = dest[0].toUpperCase() + dest.slice(1);
		this.setState({types: destination});
		//hashHistory.push(e.target.attributes.value.value);
	}

	goToDetail(e){
		let dest = e.target.innerText.split(' ')[1];
		let destination = dest[0].toUpperCase() + dest.slice(1);
		this.setState({types: destination});
		let link = 'vessel/'+this.props.currentVoyage.id+'/'+dest;
		hashHistory.push(link);
	}

	goToSummary(e){
		let dest = e.target.innerText.split(' ')[1];
		let destination = dest[0].toUpperCase() + dest.slice(1);
		this.setState({types: destination});
		hashHistory.push('/vessel/'+this.props.currentVoyage.id+'/summary');
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

		    { (this.state.types==='Networks' && this.state.types==='Ecologies' ) &&

	        	<div>
		            <div className="row p30 aquaL fadein">
		            	<div className="block-center col-lg-4 col-lg-offset-1 text-center p20 summary">
		              		<h5 className="white returns closeB" onClick={e => this.goToSubpage(e)}>to summary</h5>
		              	</div>
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
		    { this.props &&
			        this.props.children && React.cloneElement(this.props.children, Object.assign({}, this.props, {
			          stateA : this.state,
			          methods : {labelShips: this.labelShips, unlabelShips:this.unlabelShips, goTo: this.goTo, goToSubpage: this.goToSubpage, goToDetail: this.goToDetail, goToSummary: this.goToSummary, labelSite: this.labelSite, unlabelSite:this.unlabelSite, labelSites: this.labelSites, unlabelSites:this.unlabelSites  },
        			}))
			      }

	          </div>


	        </div>
	    </div>

		);
	} // render done
}

export default VesselCore;
