import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';
import '../components/Logo/Logo.css';

const app = new Clarifai.App({
	apiKey: '30651752ca9b4da8b52993b6aae32638'
});

const particlesSettings = {
	"particles": {
	    "number": {
	        "value": 50,
					"density": {
						"enable": true,
						"value_area": 800
					}
	    },
	    "size": {
	        "value": 3
	    },
	    "shadow": {
	    	"enable": true,
	    	"color": "#3CA9D1",
	    	"blur": 5
	    }
	},
	"interactivity": {
	    "events": {
	        "onhover": {
	            "enable": true,
	            // "mode": "repulse"
	        }
	    }
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: ''
		}
	}
	
	onInputChange = (event) => {
		this.setState({input: (event.target.value)});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input})
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(
			  function(response) {
			    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
			  },
			  function(err) {
			    // there was an error
			  }
			);
	}


	render() {
		return (
			<div className="main-div">
				<Particles className="particles" params={particlesSettings} />
				<Navigation />
				<Logo />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
				<FaceRecognition imageUrl={this.state.imageUrl}/>
			</div>
		);
	}
}


export default App;