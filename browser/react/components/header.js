import React from 'react';

export default (({type, vessel}) => {


  //dummy links for later...
    vessel.linkV = '';
    vessel.linkCR = '';

  if (vessel){

    (vessel.Vessel) ? vessel.Vessel = vessel.Vessel.toLowerCase() : vessel.Vessel = '';
    (vessel.Rig) ? vessel.Rig = vessel.Rig.toLowerCase() : vessel.Rig = '';

    let ship = vessel.Vessel.replace(' ', '_')+"-"+vessel.LogId;
    vessel.linkV='https://www.whalingmuseum.org/explore/library/logbooks/digitized-logbook-'+ship;
    vessel.linkCR = 'https://www.whalingmuseum.org/explore/library/logbooks/'+ship;

  }

	return (

	        <div className="row p20 fadein">
              <div className="block-center col-lg-3 col-lg-offset-1 p20">
                <p className="aqua GLCFournierItalic1786 closerB">Explore Another Voyage</p>
                <h3 className="closerT"><a href="/">home</a></h3>
                <h5 className="sButtons"><a href="/geographies">+ sailing geographies</a></h5>
                <h5 className="sButtons"><a href="/ecologies">+ catch ecologies</a></h5>
                <h5 className="sButtons"><a href="/networks">+ ship & crew networks</a></h5>
              </div>

              <div className="block-center col-lg-5 col-lg-offset-3 p20">
                <p className="aqua GLCFournierItalic1786 closerB">{type} of Voyage</p>
                <h3 className="closerT"><a href={vessel.linkV} target="blank">{vessel.Vessel}</a></h3>
                <h5 className="sButtons">{vessel.Rig}, at sea:</h5>
                <h2 className="closerB">{vessel.Start} - {vessel.End}</h2>
                <p className="aqua sButtons closerB">Voyage Log : {vessel.LogId}</p>
                <p className="aqua sButtons closerB"><a href={vessel.linkV} target="blank">Volume Scans</a> : <a href={vessel.linkCR} target="blank">Computer-Readable Summary</a></p>
              </div>
            </div>
	);

});
