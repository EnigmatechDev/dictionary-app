import * as React from 'react';
import { connect } from 'react-redux';
import { updateDictionary } from '../actions/dictionaryActions';

class ViewEdit extends React.Component<any> {
	constructor(props: any) {
		super(props);

		this.state = {
			selected: this.props.selected,
			newDictionary : this.props.dictionaries[this.props.selected]
		}

		console.log("ViewEdit props");
		console.log(this.props);

		console.log("ViewEdit state");
		console.log(this.state);

		this.handleStore = this.handleStore.bind(this);
		this.validateRow = this.validateRow.bind(this);
		this.handleNewRow = this.handleNewRow.bind(this);
	}

	validateRow(row: number) {
		let count = 0;
		let valClass = "valid"

		for(var i=0; i < this.state['newDictionary'].length; i++) {
			if( this.state['newDictionary'][row].from === this.state['newDictionary'][i].from )
				count++;
		}
	
		if(count > 1)
			valClass = "inValid";
		return valClass;
	}

	handleNewRow (event: any) {
		event.target.blur();
		console.log("handleNewRow");

		let newDictionary = this.state['newDictionary'];
		newDictionary.push({from: "", to: ""});
		console.log(newDictionary);

		this.setState({newDictionary: newDictionary});
		console.log(this.state['newDictionary']);
	}

	handleTextChange = (event: any) => {

		console.log("ViewEdit handleChange");
		let newDictionary = this.state['newDictionary'];
		let cell = event.target.id.split("_");

		if(cell[0] == 1) {
			// the From column
			newDictionary[ cell[1] ] = { from: event.target.value, to: newDictionary[ cell[1] ].to };
		} else
		
		if(cell[0] == 2) {
			// the To column
			newDictionary[ cell[1] ] = { from: newDictionary[ cell[1] ].from, to: event.target.value };
		}
		
		this.setState({newDictionary: newDictionary});
	}

	handleDeleteRow = (event: any) => {
		event.target.blur();
		console.log("handleDelete " + event.target.id);

		let newDictionary = this.state['newDictionary'];

		// remove corresponding element from array
		newDictionary.splice(event.target.id, 1);
		this.setState({newDictionary: newDictionary});
	}

	handleStore = (event: any) => {
		event.target.blur();
		
		this.props.updateDictionary(this.state['newDictionary']);
	}

	render() {
		console.log("ViewEdit render()...");
		
		let valClass = "";
		var row = 0;
		
		let rows = this.state['newDictionary'].map( (entry:any) => {
			valClass = this.validateRow(row);

			return ( 	<DictionaryRow row={ row } valClass={ valClass } key={ row++ } data={ entry }
								onChange={ this.handleTextChange } onDelete={ this.handleDeleteRow } /> );
		});

		return (<div><h3>View / edit dictionary</h3>
							<div><table className='App-table'><tbody>
								<tr><th>From</th><th>To</th>
								<th><button className="App-button-sml"onClick={ this.handleNewRow }>Add row</button></th>
								<th><button className="App-button-sml"onClick={ this.handleStore }>Store</button></th></tr>
								{ rows }
							</tbody></table></div>
						</div>);
	}
}

const DictionaryRow = (props: any) => {
	return (
		<tr>
			<td>
				<input className={ props.valClass } id={ "1_" + props.row } type="text" 
					value={ props.data.from } onChange = { props.onChange } />
			</td>
			<td>
				<input className={ props.valClass } id={ "2_" + props.row } type="text" 
					value={ props.data.to } onChange = { props.onChange } />
			</td>
			<td>
				<button className="App-button-row" id={ props.row } onClick={ props.onDelete }>Delete row</button>
			</td>
		</tr>
	);
}

const mapStateToProps = (state :any) => ({
	state: state,
	selected: state.root.selected,
	dictionaries: state.root.dictionaries
});

export default connect(mapStateToProps, { updateDictionary })(ViewEdit);
