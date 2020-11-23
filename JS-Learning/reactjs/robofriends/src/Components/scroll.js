import React from 'react';
import '../Containers/theScroll.css';

const Scroll = (props) => {
	return (
		<div className="theScroll" style={{ overflowY: 'scroll', border: '1px solid black', height: '500px'}}>
			{props.children}
		</div>
	)
}




export default Scroll;