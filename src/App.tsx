import * as React from 'react';
import { connect } from 'react-redux';

import Controls from './components/Controls';
import Overview from './components/Overview';
import ViewEdit from './components/ViewEdit';
import CreateDictionary from './components/CreateDictionary';

import './App.css';

class App extends React.Component<any> {

  public render() {
		console.log("App render...");
		console.log(this.props);

		let content = <p>default error - view: { this.props.view }</p>

		if(this.props.view === "overview") { 
			content = <Overview />
		} else
		if(this.props.view === "viewEdit") {
			content = <ViewEdit />
		} else
		if(this.props.view === "creatNew") {
			content = <CreateDictionary />
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
