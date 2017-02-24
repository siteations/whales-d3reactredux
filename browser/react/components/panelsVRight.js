import React from 'react';


export default (({animals}) => {

  var total = 0;
  animals.forEach((animal)=>{
    total += animal.Seen;
  });

	return (

	        <div className="sidePanelR col-lg-1 col-lg-offset-10">
              <div className="panelsR" >
                <img src="/img/panel-sperm.png" />
                <h5 className="text-left aqua closerT">creatures</h5>
                <p className="text-left sButtons closerB">Explore <em>Right</em></p>
              </div>

              <div className="t75">
                <ul className="p100">

                 { animals.map( (member, i) =>
                    <div className ="liSp">
                    <li onMouseOver="" onClick="" id={member.id} key={member.id}><b>{member.Type}</b>, {member.Seen}<br/><span className="sButtons">{member.Captured} caught, {member.BarrelsRendered} oil barrels</span></li>
                    </div>
                    )
                }

                </ul>
              </div>

              <h1 className="xL text-center closerB">{total}</h1>
              <h5 className="text-center aqua closerB">encountered</h5>
              <p className="text-center sButtons closerB">seen . caught . rendered . eaten</p>
          </div>
	);

});
