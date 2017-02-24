import React from 'react';
import ReactDOM from 'react-dom';

import PanelsVLeft from '../components/panelsVLeft';
import PanelsVRight from '../components/panelsVRight';
import Header from '../components/header.js';
import Summary from '../components/summary.js';
import D3Default from '../components/barDefault.js';

import {loadVoyages, selectVoyage, generalVoyage, extendVoyage, selectContacts, selectCrew, filterCrew, selectAnimals, selectPlaces} from '../action-creators/actions.js';

const VesselCore = (props => {

	//console.log('current vessel page:', props);

	//rework animals for summary
		var captureCnt=0;
		props.currentAnimals.forEach(animal=>{
			captureCnt += +animal.Captured;
		});


	return (
	<div className="container-fluid blackB">
      <img id="animBack" src="/img/vessels-bk0.jpg" />
      <img id="animFront" src="/img/vessels-bk1.jpg" />
      {/*<!--EVERYTHING ABOVE IS BACKGROUND ANIMATION, below is content that shifts...-->*/}
        <div className="masterWindow">

          <PanelsVLeft crew={props.currentCrew} />
          <PanelsVRight animals={props.currentAnimals} />

          <div className="block-center col-lg-10 col-lg-offset-1">

            <Header type="Summary Statistics" vessel={props.currentVoyage}/>

        {/* summary divs - all vessel summary pages*/}
            <div className="row p20 aquaL fadein">
              <div className="block-center col-lg-4 col-lg-offset-1 text-center p20 summary">
                <Summary type= "contact" content={props.currentContacts.length}/>
              </div>

              <div className="block-center col-lg-2 text-center p20 summary">
                <Summary type= "places" content={props.currentPlaces.length}/>
              </div>

              <div className="block-center col-lg-4 text-center p20 summary">
                <Summary type= "catch" content={captureCnt}/>
              </div>
            </div>

        {/* svg-d3 graph area - short - all subpages*/}

            <div className="row fadein p20 t45 block-center" id="d3-short">
              <div className="block-center col-lg-10 col-lg-offset-1">
              	<div className="block-center placeholder" id="d3Here">
                	<D3Default state={props} />
                </div>
              </div>
            </div>

          </div>


        </div>
    </div>

	);
});

export default VesselCore;
