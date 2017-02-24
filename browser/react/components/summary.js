import React from 'react';

export default (({type, content}) => {

	let elem={
		title: '',
		subtitle: '',
	}

	if (type === 'contact') {
		elem.title = 'ship meetings'; elem.subtitle ='passing messages' ;
	} else if (type === 'places'){
		elem.title = 'places visited'; elem.subtitle ='islands and ports' ;
	} else {
		elem.title = 'whales caught'; elem.subtitle ='market focus' ;

	};


	return (
	     <div>
	        <h1 className="aquaL xL">{content}</h1>
            <h5 className="white">{elem.title}</h5>
            <p className="closerB">{elem.subtitle}</p>
         </div>
	)
});
