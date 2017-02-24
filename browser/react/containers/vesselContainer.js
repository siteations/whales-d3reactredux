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
  };
});

const mapDispatchToProps = (dispatch => {
  return {
  };
});

const vesselContainer = connect(mapStateToProps, mapDispatchToProps)(VesselCore);

// class vesselContainer extends React.Component {
// 	render (){
// 		return (
// 		  <div className="container-fluid blackB">
//       <img id="animBack" src="/img/vessels-bk0.jpg" />
//       <img id="animFront" src="/img/vessels-bk1.jpg" />
//       {/*<!--EVERYTHING ABOVE IS BACKGROUND ANIMATION, below is content that shifts...-->*/}
//         <div className="masterWindow">

//           <PanelsVLeft />
//           <PanelsVRight />

//           <div className="block-center col-lg-10 col-lg-offset-1">

//             <Header type="Summary Statistics" />

//         {/* summary divs - all vessel summary pages*/}
//             <div className="row p20 aquaL fadein">
//               <div className="block-center col-lg-4 col-lg-offset-1 text-center p20 summary">
//                 <Summary type= "contact" />
//               </div>

//               <div className="block-center col-lg-2 text-center p20 summary">
//                 <Summary type= "places" />
//               </div>

//               <div className="block-center col-lg-4 text-center p20 summary">
//                 <Summary type= "catch" />
//               </div>
//             </div>

//         {/* svg-d3 graph area - short - all subpages*/}

//             <div className="row fadein p20 t45 block-center" id="d3-short">
//               <div className="block-center col-lg-10 col-lg-offset-1">
//                 <svg className="placeholder">
//                 graph goes here
//                 </svg>
//               </div>
//             </div>

//           </div>


//         </div>
//     </div>

// 		)
// 	};
// };

export default vesselContainer;
