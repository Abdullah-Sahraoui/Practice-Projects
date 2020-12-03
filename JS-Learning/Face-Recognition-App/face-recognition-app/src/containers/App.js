import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Signin from '../components/Signin/Signin';
import Register from '../components/Register/Register';
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
			imageUrl: '',
			box: {},
			route: 'signin',
			isSignedIn: false
		}
	}
	
	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('image-input');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		console.log(box);
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: (event.target.value)});
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input})
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
		  .catch(err => console.log(err));
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
			this.setState({isSignedIn: false})
		} else if (route === 'home') {
			this.setState({isSignedIn: true})
		}
		this.setState({route: route});
	}


	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className="main-div">
				<Particles className="particles" params={particlesSettings} />
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/> 
				{ route === 'home' 
					? <div>
							<Logo />
							<ImageLinkForm
								onInputChange={this.onInputChange}
								onButtonSubmit={this.onButtonSubmit}
							/>
							<FaceRecognition imageUrl={imageUrl} box={box}/>
						</div>
					: (
							route === 'signin' 
							? <Signin onRouteChange={this.onRouteChange}/>
							: <Register onRouteChange={this.onRouteChange}/>
						)
			}
			</div>
		);
	}
}


export default App;