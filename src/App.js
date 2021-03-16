import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import './App.css';

// Api Key Clarifai here
const app = new Clarifai.App({apiKey: '22a65b0736674a048b69dd5bc55543da'});

const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
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
		this.setState({input: event.target.value})
		console.log(event.target.value);
	}

	onButtonSubmit = () => {
		this.setState({imageUrl: this.state.input});

		// modelo clarifai
		app.models
			.predict({
				id:'d02b4508df58432fbb84e800597b8959'
			}, this.state.input)
			.then(
		  function(response) {
		    // do something with response
		    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
		  },
		  function(err) {
		    // there was an error
		  }
		);
		console.log('click');
	}

	render() {
		return (
			<div className="App">
				<Particles className="particles" 
				 params={particlesOptions}
				/>
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
			    <FaceRecognition imageUrl={this.state.imageUrl} />
			</div>
		);
	}
}

export default App;
