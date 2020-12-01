import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';
import '../components/Logo/Logo.css';

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
		}
	}
	
	onInputChange = (event) => {
		console.log(event.target.value);
	}

	onButtonSubmit = () => {
		console.log('click');
	}


	render() {
		return (
			<div>
			<Particles className="particles" params={particlesSettings} />
				<Navigation />
				<Logo />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
			</div>
		);
	}
}


export default App;