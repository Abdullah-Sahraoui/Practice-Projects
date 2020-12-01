import React from 'react';
import Tilt from 'react-tilt';
import Selfie from './selfie.png';

const Logo = () => {
	return(

			<Tilt className="Tilt pa3 tc ml3 br2 shadow-2 allow-pointer-events" options={{ max : 55 }} style={{ height: 200, width: 200, background: 'linear-gradient(to left, rgb(230, 0, 180), rgb(4, 180, 121))' }} >
				<div className="Tilt-inner">
					<img src={Selfie} alt="Brain Image" id="image" style={{paddingTop: '15px'}}/>
				</div> 
			</Tilt>


	);
}

export default Logo;