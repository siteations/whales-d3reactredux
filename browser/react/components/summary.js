import React from 'react';

export default (({type, content, methods}) => {

	let elem={
		title: '',
		subtitle: '',
		link: '',
	}

	if (type === 'contact') {
		elem.title = 'ship meetings'; elem.subtitle ='passing messages' ;  elem.link='explore networks';
	} else if (type === 'places'){
		elem.title = 'places visited'; elem.subtitle ='islands and ports' ; elem.link='explore geographies';
	} else {
		elem.title = 'whales caught'; elem.subtitle ='market focus' ;  elem.link='explore ecologies';

	};


	return (
	     <div>
	        <h1 className="aquaL xL">{content}</h1>
            <h5 className="white">{elem.title}</h5>
            <p className="closerB">{elem.subtitle}</p>
            <p className="contactLabel closerB aqua ital returns" onClick={e => methods(e)} >{elem.link}</p>
         </div>
	);
});
