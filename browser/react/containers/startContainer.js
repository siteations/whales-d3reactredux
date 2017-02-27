import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import start from '../components/start.js';

import {selectVoyage, startingArr } from '../action-creators/actions.js';

const mapStateToProps = () => {
  return {
    voyages: startingArr
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectVoyage(voyage) {
      dispatch(selectVoyage(voyage));
    }
  };
};

const startContainer = connect(mapStateToProps, mapDispatchToProps)(start);

export default startContainer;


// class startContainer extends React.Component {
// 	render (){
// 		return (
// 		  <div className="container-fluid">
//         <img id="animBack" src="/img/opening-bk0.jpg" />
//         <img id="animFront" src="/img/opening-bk1.jpg" />
//         <img id="animWhale" src="/img/opening-whales.png" />

//         <div className="masterWindow">
//       {/*passive side containers*/}
//             <div className="col-lg-1 sidePanelL">
//             </div>
//             <div className="col-lg-1 col-lg-offset-10 sidePanelR">
//             </div>
//       {/*central container*/}
//             <div className="block-center col-lg-10 col-lg-offset-1 fadein">
//               <div className="row text-center">
//                 <h1 className="maintitle p20">call me ishmael</h1>
//                 <h5 className="subtitle">join a voyage</h5>

//                 <div className="row text-center p20">
//                   <form type="post" >
//                     <select className="voyageSelect" name="voyage">
//                       <option className="text-center" value="example">example</option>
//                       <option className="text-center" value="example2">example2</option>
//                       <option className="text-center" value="example3">example3</option>
//                     </select>
//                     <br/>
//                     <br/>
//                     <button type="submit" className="btn btn-default buttonSelect p20" value="Submit">+ submit +</button>
//                     <br/>
//                     <br/>
//                     <br/>
//                   </form>
//                 </div>

//                 <div id="intro" className="col-lg-6 col-lg-offset-3">
//                   <h4 className="subtitle">an exploration of whaling logs</h4><br/>
//                   <p className="text-left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus volutpat velit tincidunt convallis. Donec tincidunt ut est eu consectetur. Nulla arcu turpis, facilisis et tellus in, vulputate sagittis leo. Etiam nisl est, consequat sed porttitor varius, varius et est. Aenean placerat id magna eget euismod. Sed ornare augue et congue bibendum. Curabitur id condimentum nibh. Curabitur justo mi, dapibus luctus dignissim id, convallis quis tellus. Fusce luctus elementum massa, id luctus ligula lobortis ac. Cras ante ante, fermentum et laoreet ac, fermentum et orci.</p><br/>
//                   <h5 className="text-left">data sources & links:</h5>
//                   <p className="text-left"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tempus volutpat velit tincidunt convallis. Donec tincidunt ut est eu consectetur. Nulla arcu turpis, facilisis et tellus in, vulputate sagittis leo. Etiam nisl est, consequat sed porttitor varius, varius et est. Aenean placerat id magna eget euismod. Sed ornare augue et congue bibendum. Curabitur id condimentum nibh. Curabitur justo mi, dapibus luctus dignissim id, convallis quis tellus. Fusce luctus elementum massa, id luctus ligula lobortis ac. Cras ante ante, fermentum et laoreet ac, fermentum et orci.</p>
//                 </div>
//               </div>
//             </div>
//         </div>
//     </div>

// 		)
// 	};
// };

// export default startContainer;
