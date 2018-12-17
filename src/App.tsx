import * as React from 'react';
import { Provider } from 'react-redux';

import Controls from './components/Controls';
import Overview from './components/Overview';
import ViewEdit from './components/ViewEdit';
import CreateDictionary from './components/CreateDictionary';

import store from './store';

import './App.css';

interface IProps {
}

interface IState {
	view: String
}

class App extends React.Component<IProps, IState> {

	state: IState;

	constructor(props: IProps) {
		super(props);

		this.state = {
			view: "overview"
		}
	};

	handleView = (view: String) => {
		console.log("App.handleView " + view );
		this.setState({ view: view });
	}

	handleViewEdit = () => {
		console.log("App.handleViewEdit" );
		this.setState({ view: "viewEdit" });
	}

  public render() {
		console.log("App render...");
		console.log(this.props);
		console.log(this.state);

		let content = <p>default error - view: {this.state.view}</p>

		if(this.state.view === "overview") { 
			content = <Overview handleView={ this.handleView } />
		} else
		if(this.state.view === "viewEdit") {
			content = <ViewEdit handleView={ this.handleViewEdit } />
		} else
		if(this.state.view === "creatNew") {
			content = <CreateDictionary handleView={ this.handleView } />
		}

		return (
			<Provider store={store}>
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Dictionary App - by Phil Doyle</h1>
						<Controls handleView={ this.handleView } />
					</header>
					<div className="App-content">
						{ content }
					</div>
				</div>
			</Provider>
		);
	}
}

export default App;