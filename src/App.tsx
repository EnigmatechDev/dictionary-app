import * as React from 'react';
import { connect } from 'react-redux';

import Controls from './components/Controls';
import Overview from './components/Overview';
import Dictionary from './components/Dictionary';

import './App.css';

class App extends React.Component<any> {

  public render() {
		console.log("App render...");
		console.log(this.props);

		let content = <p>default error - view: { this.props.view }</p>

		if(this.props.view === "overview") { 
			content = <Overview />
		} else {
			content = <Dictionary />
		}

		return (
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Dictionary App - by Phil Doyle</h1>
						<Controls />
					</header>
					<div className="App-content">
						{ content }
					</div>
				</div>
		);
	}
}

const mapStateToProps = (state :any) => ({
	state: state,
	view: state.root.view
});

export default connect(mapStateToProps)(App);
