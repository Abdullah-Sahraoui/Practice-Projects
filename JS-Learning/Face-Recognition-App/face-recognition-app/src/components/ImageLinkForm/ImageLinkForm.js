import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className="f3 center fw6">
				{'This app detects any faces in your pictures. Enter your image URL below to get started!'}
			</p>
			<div className="center">
				<div className="center pa4 form ba br2 b--orange">
					<input className="f4 pa2 w-70 center" type="text" placeholder="Enter URL here" onChange={onInputChange}/>
					<button className="w-30 grow f4 link ph3 pv2 dib white bg-pink shadow" onClick={onButtonSubmit} >Detect</button>
				</div>
			</div>
		</div>
	);
}


export default ImageLinkForm;