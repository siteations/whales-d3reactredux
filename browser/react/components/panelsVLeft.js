import React from 'react';

export default (({crew}) => {

//ADD A SORTING MECHANISM HERE OR IN THE FILTER SYSTEM TO LOAD IN RANK ORDER, THEN ALPHABETICAL

  var crewList = crew.slice(0,15);

	return (

	        <div className="col-lg-1 sidePanelL">
              <div className="panelsL" >
                <img src="/img/panel-humpback.png" />
                <h5 className="text-right aqua closerT">seafarers</h5>
                <p className="text-right sButtons closerB">Explore <em>Left</em></p>
              </div>

              <div className="t75">
                <ul className="p100">

	              { crewList.map( (member) =>
                    <div className ="liSp">
                    <li onMouseOver="" onClick="" id={member.id} key={member.id}><b>{member.FirstName} {member.LastName}</b><br/><span className="sButtons">rank: {(member.Rank)? (member.Rank) : 'unknown'} </span></li>
                    </div>
                    )
                }

                </ul>
              </div>

              <h1 className="xL text-center closerB">{crew.length}</h1>
              <h5 className="text-center aqua closerB">employed</h5>
              <p className="text-center sButtons closerB">survived . died . marooned . deserted</p>
          </div>
	);

});
