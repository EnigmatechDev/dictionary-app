import * as React from 'react';
//import { createStore } from 'redux'
import { Controls } from './Controls';
import { CreateDictionary } from './CreateDictionary';
import { Dictionary } from './Dictionary';
import { Overview } from './Overview';

import './App.css';

interface IProps {
}

interface IState {
	view: String,
	selectedId: any,
	store: any
}

class App extends React.Component<IProps, IState> {

	state: IState;

	constructor(props: IProps) {
		super(props);

		this.state = {
			view: "overview",
			selectedId: 0,
			store: []
		}
	};

	handleSelect = (id: String) => {
		console.log("App.handleSelect() " + id);
		this.setState({selectedId: id, view: "viewEdit"});
	}

	handleDelete = (id: String) => {
		console.log("App.handleDelete() " + id);
		let storeBuf = this.state.store;
		storeBuf.splice(id, 1);

		this.setState({ store: storeBuf, view: "overview"});
	}

	handleCreateNew = () => {
		console.log("App.handleCreateNew()...");
		this.setState({view: "creatNew"});
	}

	handleViewAll = () => {
		console.log("App.handleViewAll()...");
		this.setState({view: "overview"});
	}

	handleStoreDictionary = (id: any, update: { from: string, to: string }[] ) => {
		console.log("App.handleStoreDictionary()...");
		
		// update the state with this dictionary
		let storeBuf = this.state.store;
		storeBuf[id] = update;

		this.setState({ store: storeBuf });
	}

  public render() {
		if(this.state.view === "overview") {
			return (
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Dictionary App - by Phil Doyle</h1>
						<Controls onCreateNew={ this.handleCreateNew } onViewAll={ this.handleViewAll }/>
					</header>
					<div className="App-content">
						<Overview store={ this.state.store } onSelect={ this.handleSelect } onDelete={ this.handleDelete }/>
					</div>
				</div>
			);
		} else
		if(this.state.view === "viewEdit") {

			let tData = this.state.store[ this.state.selectedId ];

			return (
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Dictionary App - by Phil Doyle</h1>
						<Controls onCreateNew={ this.handleCreateNew } onViewAll={ this.handleViewAll }/>
					</header>
					<div className="App-content">
						<Dictionary id={this.state.selectedId} onStore={ this.handleStoreDictionary } tData={ tData } />
					</div>
				</div>
			);
		} else
		if(this.state.view === "creatNew") {
			return (
				<div className="App">
					<header className="App-header">
						<h1 className="App-title">Dictionary App - by Phil Doyle</h1>
						<Controls onCreateNew={ this.handleCreateNew } onViewAll={ this.handleViewAll }/>
					</header>
					<div className="App-content">
						<CreateDictionary id={this.state.store.length} onStore={ this.handleStoreDictionary } />
					</div>
				</div>
			);		
		} else {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Dictionary App - by Phil Doyle</h1>
					<Controls onCreateNew={ this.handleCreateNew } onViewAll={ this.handleViewAll }/>
				</header>
				<div className="App-content">
					<p>default error - view: {this.state.view}</p>
				</div>
			</div>
		);
		}	
	}
}

export default App;
