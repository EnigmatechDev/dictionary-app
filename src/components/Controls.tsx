import * as React from 'react';
import { connect } from 'react-redux';
import { changeView } from '../actions/dictionaryActions';

class Controls extends React.Component<any> {

	handleView = (event: any) => {
		event.target.blur();
		this.props.changeView(event.target.id);
	}

  public render() {
		if (this.props.view === "viewEdit") {
			return (
				<div className="controls">
				<button className="App-button" id="overview" onClick={ this.handleView }>View All Dictionaries</button>
				</div>
			);
		} else
		if (this.props.view === "overview") {
			return (
				<div className="controls">
				<button className="App-button" id="createNew" onClick={ this.handleView }>Create New Dictionary</button>
				</div>
			);
		} else {
			return (
				<div className="controls">
				<button className="App-button" id="overview" onClick={ this.handleView }>View All Dictionaries</button>
				</div>
			);
		}
  }
}

const mapStateToProps = (state :any) => ({
	state: state,
	view: state.root.view
});

export default connect( mapStateToProps, { changeView })(Controls);