import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import PanelsVLeft from '../components/panelsVLeft';
import PanelsVRight from '../components/panelsVRight';
import Header from '../components/header.js';
import Summary from '../components/summary.js';

import {loadVoyages, selectVoyage, generalVoyage, extendVoyage, selectContacts, selectCrew, filterCrew, selectAnimals, selectPlaces} from '../action-creators/actions.js';

const D3Geo = (({stateO, stateA, methods}) => {

  /*
  stateO is original props from react-redux mappings
  stateA is added states from local events, includes:
    contactLabel

  methods holds the mouseOver/Out/link actions
  */
  //console.log(stateO.MthAnimals);

  //add svg later...
  d3.select("#core").remove(); // only one update thru store...

  let width = 950;
  let height = 500;
  var minorticks=[];

  if (stateO.currentVoyage.Dates){
    for (let i=0; i<12*(stateO.currentVoyage.Length-1); i++){
      minorticks.push(1);
    };
  };

  if (stateO.currentContacts){ //scrub out nulls and spaces...
    var contacts = stateO.currentContacts.filter(contact=>{
      return (contact.Vessel.trim() !== '');
    })
  };

  if (stateO.voyages){
    var voyages = {};
    stateO.voyages.forEach(voyage=>{
        voyages[voyage.Vessel.trim()] = voyage.id;
    })
  };

  //console.log(voyages);

  return (
    <div>
      <svg className='placeholder'>
          {stateO.MthPlaces && stateO.MthAnimals && stateO.MthPlaces.map((month,i) => {
              var x =[i]*(width-140)/(12*(stateO.currentVoyage.Length-1))+70;
              var y =275/2-30;
              var x2 =x+1;
              var h = (month.length) ? month.length*12 : 1;
              var y2 = y-5-h;
              var w = (width-140)/(12*(stateO.currentVoyage.Length-1))-2;
              var sites = month.map(site=>{return site.Day+'-'+site.Month+' '+site.Place}).sort().slice(0,5).join(', ');
              var data1 = (month.length>4) ? month.length+' sites visited: '+ sites +' . . .' :  month.length+' sites visited: '+ sites;
              return (<g>
                      <rect className='tick' x={x} y={y} width='1' height='10' fill='#4d7a7a' opacity='1' />
                      <rect className='Bars' x={x2} y={y2} width={w} height={h} fill='#4d7a7a' opacity='.75' value={data1} onMouseOver={ e => methods.labelShips(e)} onMouseOut={ e => methods.unlabelShips(e)} />
                      </g>
                      )
            }) //minor ticks mapped for the timeline
          }

        {stateO.currentVoyage.Dates && stateO.currentVoyage.Dates.map((date,i) => {
          var x=[i]*(width-140)/(stateO.currentVoyage.Length-1)+70;
          var y=275/2-30;
          return (<g>
                  <rect className='tick' x={x} y={y} width='2' height='10' fill='#ffffff' opacity='1' />
                  <text className="tickDates" x={x} y={y+24} fill="#ffffff">{date}</text>
                  </g>
                  )
            }) //major ticks and labels for years
          }
          <text className="start white" x={0} y={275/2-23} fill="#ffffff" opacity=".75" >Dates</text>
          <text className="start" x={0} y={275/2-50} fill="#ffffff" >Places</text>
          <text className="start white" x={0} y={275/2-100} fill="#ffffff" opacity=".75" >Mouseover for info</text>
          <text className="contactLabel" x={width/2} y={275/2+20} fill="#ffffff" >{stateA.contactLabel}</text>
      </svg>
    </div>
  );


});

export default D3Geo;
