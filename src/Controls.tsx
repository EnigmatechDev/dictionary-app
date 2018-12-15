import * as React from 'react';

interface IProps {
	onCreateNew: Function,
	onViewAll: Function
}

interface IState {
}

export class Controls extends React.Component<IProps, IState> {

	handleCreateNew = (event: any) => {
		event.target.blur();
		console.log("handleCreateNew...");
		this.props.onCreateNew();
	}

	handleViewAll = (event: any) => {
		event.target.blur();
		console.log("handleViewAll...");
		this.props.onViewAll();
	}

  public render() {
    return (
      <div className="controls">
       <button className="App-button" onClick={ this.handleCreateNew }>Create New Dictionary</button>
			 <button className="App-button" onClick={ this.handleViewAll }>View All Dictionaries</button>
      </div>
    );
  }
}
