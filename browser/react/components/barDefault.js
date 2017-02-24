import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

import PanelsVLeft from '../components/panelsVLeft';
import PanelsVRight from '../components/panelsVRight';
import Header from '../components/header.js';
import Summary from '../components/summary.js';

import {loadVoyages, selectVoyage, generalVoyage, extendVoyage, selectContacts, selectCrew, filterCrew, selectAnimals, selectPlaces} from '../action-creators/actions.js';

const D3Default = (({state}) => {

  //add svg
  d3.select("#core").remove(); // only one update thru store...

  let width = 950;
  let height = 275;
  var minorticks=[];

  if (state.currentVoyage.Dates){
    for (let i=0; i<12*(state.currentVoyage.Length-1); i++){
      minorticks.push(1);
    };
  };

  if (state.currentContacts){ //scrub out nulls and spaces...
    var contacts = state.currentContacts.filter(contact=>{
      return (contact.Vessel.trim() !== '');
    })
  };

  if (state.voyages){
    var voyages = state.voyages.map(voyage=>{
        return voyage.Vessel.trim();
    })
  };

  //----------------SPECIFIC HOVER INFO REVEALS-----------------

function extraInfo(e){
    e.preventDefault();
    console.dir(e.target.attributes.value.value);
    return (
      <g id='shipInfo'>
        <text className="" x={width/2} y={275/2+50} fill="#ffffff" >{e.target.attributes.value.value}</text>
      </g>
    );

  }



  return (
    <div>
      <svg className='placeholder'>
          {minorticks && minorticks.map((tick,i) => {
              var x=[i]*(width-140)/(12*(state.currentVoyage.Length-1))+70;
              var y=275/2-12;
              return (<g>
                      <rect className='tick' x={x} y={y} width='1' height='10' fill='#4d7a7a' opacity='1' />
                      </g>
                      )
            }) //minor ticks mapped for the timeline
          }

        {state.currentVoyage.Dates && state.currentVoyage.Dates.map((date,i) => {
          var x=[i]*(width-140)/(state.currentVoyage.Length-1)+70;
          var y=275/2-12;
          return (<g>
                  <rect className='tick' x={x} y={y} width='2' height='20' fill='#ffffff' opacity='1' />
                  <text className="tickDates aqua" x={x} y={y+37} fill="#ffffff">{date}</text>
                  </g>
                  )
            }) //major ticks and labels for years
          }

          {contacts && contacts.map((name,i) => {
            var x=([i]*(width-20)/(state.currentContacts.length-1)+10);
            var y=(275/2+55);
            var type="contactsNames";
            var data= name.Vessel+', ('+name.Rig+') from '+name.Port;

            if (voyages.indexOf(name.Vessel)!== -1){
                type="contactsNames specific";
                data += ' (see my summary)'
            }

          return (<g>
                  <text className={type} x={x} y={y} transform={`rotate(-90 ${x+10},${y})`} fill="#ffffff" value={data} onMouseOver={ e => extraInfo(e)} >{name.Vessel}</text>
                  </g>
                  )
            }) //major ticks and labels for years
          }
      </svg>
    </div>
  );


});

export default D3Default;
