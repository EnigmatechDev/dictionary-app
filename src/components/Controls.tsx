import * as React from 'react';
import { connect } from 'react-redux';

interface IProps {
	handleView: Function
}

interface IState {
}

class Controls extends React.Component<IProps, IState> {

	handleView = (event: any) => {
		event.target.blur();
		this.props.handleView(event.target.id);
	}

  public render() {
    return (
      <div className="controls">
       <button className="App-button" id="creatNew" onClick={ this.handleView }>Create New Dictionary</button>
			 <button className="App-button" id="overview" onClick={ this.handleView }>View All Dictionaries</button>
      </div>
    );
  }
}

export default connect(null)(Controls);