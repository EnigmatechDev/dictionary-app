import * as React from 'react';
import { connect } from 'react-redux';
import { selectDictionary } from '../actions/dictionaryActions';
import { deleteDictionary } from '../actions/dictionaryActions';

class Overview extends React.Component<any> {

	constructor(props: any) {
		super(props);
		
		this.state = {
		// A hardcoded dictionary for testing
		//	newDictionary : [
		//		{ from: "Anthracite", to: "Gray"},
		//		{ from: "Midnight Black", to: "Black"},
		//		{ from: "Mystic Silver", to: "Silver"}
		//	]
			newDictionary: [] // set to the selected dictionary
		}
	}

	handleSelect = (event: any) => {
		event.target.blur();
		console.log("handleSelect " + event.target.id);

		this.props.selectDictionary(event.target.id);
		this.props.handleView("viewEdit");
	}

	handleDelete = (event: any) => {
		event.target.blur();
		console.log("handleDelete " + event.target.id);
		
		this.props.deleteDictionary(event.target.id);
	}

	render() {
		console.log("Overview render()...");

		console.log(this.state);
		console.log(this.props);
		
		let rows = [];

		for (var idx = 0; idx < this.props.dictionaries.length; idx++){
      let rowId = `${idx}`;
			
			rows.push(<tr key={ idx }>
									<td>Dictionary { idx }</td>
									<td><button id={ rowId } onClick={ this.handleSelect }>View/Edit</button></td>
									<td><button id={ rowId } onClick={ this.handleDelete }>Delete</button></td>
								</tr>);
    }

		let message = "";
	
		if (this.props.dictionaries.length === 1)
			message = "There is currently 1 dictionary";
		else
			message = "There are currently " + this.props.dictionaries.length + " dictionaries";
		
		return (<div>
							<div>
								<p>
								{ message }
								</p>
								<table>
									<tbody>{ rows }</tbody>
								</table>
							</div>
						</div>);
	}
}

const mapStateToProps = (state :any) => ({
	dictionaries: state.root.dictionaries,

	state: state
});

export default connect(mapStateToProps, { deleteDictionary, selectDictionary } )(Overview);
