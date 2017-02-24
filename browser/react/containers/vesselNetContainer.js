import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

//each side panel should be a component - loads/links back from data
//the center should be three components - top bar/home links, the repeated summary divs (from state returns),
import PanelsVLeft from '../components/panelsVLeft';
import PanelsVRight from '../components/panelsVRight';
import Header from '../components/header.js';


class vesselNetContainer extends React.Component {
  render (){
    return (
      <div className="container-fluid blackB">
      <img id="animBack" src="/img/vessels-bk0.jpg" />
      <img id="animFront" src="/img/vessels-bk1.jpg" />
      {/*<!--EVERYTHING ABOVE IS BACKGROUND ANIMATION, below is content that shifts...-->*/}
        <div className="masterWindow">
          {/* left and right panel component */}
          <PanelsVLeft />
          <PanelsVRight />

          <div className="block-center col-lg-10 col-lg-offset-1">

        {/* title component - all subpages*/}
            <Header type="Networks" />

            <div className="row p50 aquaL text-center fadein">
                <h5 className="white" >charting whaling ecologies and externalities</h5>
                <p className="white sButtons"> 24 whales caught . 82 whales seen . 17 types of creatures </p>
            </div>


        {/* svg-d3 graph area - short - all subpages*/}

            <div className="row fadein p20 t75 block-center" id="d3-short">
              <div className="block-center col-lg-10 col-lg-offset-1">
                <svg className="placeholder2">
                </svg>
              </div>
            </div>

          </div>


        </div>
    </div>

    )
  };
};

export default vesselNetContainer;
