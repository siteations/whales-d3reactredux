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
    siteLabel
    sitesLabels

  methods holds the mouseOver/Out/link actions
  */

  //add svg later...
  //d3.select("#core").remove(); // only one update thru store...

  let width = 950;
  let height = 600;
  var minorticks=[];

  if (stateO.currentVoyage.Dates){
    for (let i=0; i<12*(stateO.currentVoyage.Length-1); i++){
      minorticks.push(1);
    };
  };

  if (stateO.voyages){
    var voyages = {};
    stateO.voyages.forEach(voyage=>{
        voyages[voyage.Vessel.trim()] = voyage.id;
    })
  };

  //--------------D3 methods here--------------------

  var projection = d3.geoEquirectangular()
          .scale(128)
          .rotate([-220,0])
          .center([0,-25]);

  var pathGenerator = d3.geoPath()
          .projection(projection);

  var ydatum=400;

  /*.attr("cx", d => return projection(d.Location)[0] )

  .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
                 })*/

  //-------------------and return---------------------

  return (
    <div>
      <svg className='placeholder2'>
        <path d={pathGenerator(stateO.baseGeography)} fill="#4d7a7a" opacity=".75" />

        {stateO.currentPlaces && stateO.currentPlaces.map(place => {
          if (place.Location[1]){
            let corrected = [place.Location[1], place.Location[0]];

            return (
              <circle cx={projection(corrected)[0]} cy={projection(corrected)[1]} r="3" fill="#ffffff" opacity=".75" value={place.Place} onMouseOver={ e => methods.labelSite(e)} onMouseOut={ e => methods.unlabelSite(e)} />
            );
           };
          })
        }
        <text className="mapLabel" x={+stateA.siteLabel.x + 10} y={+stateA.siteLabel.y} fill="#ffffff" >{stateA.siteLabel.name}</text>

          {stateA.siteLabels &&
              stateA.siteLabels.map(place => {
                if (place.Location[1]){
                  let corrected = [place.Location[1], place.Location[0]];

                  return (
                    <text  className="mapLabel" x={projection(corrected)[0]+10} y={projection(corrected)[1]}>{place.Place}</text>
                  );
                 };

              })
          }

          {stateO.MthPlaces && stateO.MthAnimals && stateO.MthPlaces.map((month,i) => {
              var x =[i]*(width-140)/(12*(stateO.currentVoyage.Length-1))+70;
              var y =ydatum;
              var x2 =x+1;
              var h = (month.length) ? month.length*12 : 1;
              var y2 = y-5-h;
              var w = (width-140)/(12*(stateO.currentVoyage.Length-1))-2;
              var sites = month.map(site=>{return site.Day+'-'+site.Month+' '+site.Place}).sort().slice(0,5).join(', ');
              var hsite = month.map(site=>{return site.Place}).join(',');
              var data1 = (month.length>4) ? month.length+' sites visited: '+ sites +' . . .' :  month.length+' sites visited: '+ sites;
              return (<g>
                      <rect className='tick' x={x} y={y} width='1' height='10' fill='#4d7a7a' opacity='1' />
                      <rect className='Bars' x={x2} y={y2} width={w} height={h} fill='#a5cdce' opacity='.75' value={data1} data={hsite} onMouseOver={ e => methods.labelSites(e)} onMouseOut={ e => methods.unlabelSites(e)} />
                      </g>
                      )
            }) //minor ticks mapped for the timeline
          }

        {stateO.currentVoyage.Dates && stateO.currentVoyage.Dates.map((date,i) => {
          var x=[i]*(width-140)/(stateO.currentVoyage.Length-1)+70;
          var y=ydatum;
          return (<g>
                  <rect className='tick' x={x} y={y} width='2' height='10' fill='#ffffff' opacity='1' />
                  <text className="tickDates" x={x} y={y+24} fill="#ffffff">{date}</text>
                  </g>
                  )
            }) //major ticks and labels for years
          }
          <text className="start white" x={0} y={ydatum+10} fill="#ffffff" opacity=".75" >Dates</text>
          <text className="start aquaL" x={0} y={ydatum-20} fill="#ffffff" >Places</text>
          <text className="h5L" x={0} y={ydatum-110} fill="#ffffff" >geographies</text>
          <text className="start white" x={0} y={ydatum-84} fill="#ffffff" opacity=".75" >Mouseover for info</text>
          <text className="start white" x={10} y={ydatum-70} fill="#ffffff" opacity=".75" >graph and map</text>
          <text className="contactLabel fade1" x={width/2} y={ydatum+50} fill="#ffffff" >{stateA.contactLabel}</text>

          {/*-----------------OLD STRUCTURE OF SVG ABOVE AND NEW JSON MATERIALS BELOW--------------------------------*/}

      </svg>
    </div>
  );


});

export default D3Geo;
