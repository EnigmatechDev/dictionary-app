import * as React from 'react';
import { connect } from 'react-redux';
import { createDictionary } from '../actions/dictionaryActions';

class CreateDictionary extends React.Component<any> {
	constructor(props: any) {
		super(props);
		
		this.state = {
		// A hardcoded dictionary for testing
			newDictionary : [
				{ from: "Anthracite", to: "Gray"},
				{ from: "Midnight Black", to: "Black"},
				{ from: "Mystic Silver", to: "Silver"}
			]
			// newDictionary: [
			//	{ from: "", to: ""}
			// ]
		}

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
		console.log("handleNewRow...");

		let newDictionary = this.state['newDictionary'];
		newDictionary.push({from: "-", to: "-"});
		console.log(newDictionary);

		this.setState({newDictionary: newDictionary});
		console.log(this.state['newDictionary']);
	}

	handleChange = (event: any) => {

		console.log("handleChange...");
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

	handleDelete = (event: any) => {
		event.target.blur();
		console.log("handleDelete " + event.target.id);

		let newDictionary = this.state['newDictionary'];

		// remove corresponding element from array
		newDictionary.splice(event.target.id, 1);
		this.setState({newDictionary: newDictionary});
	}

	handleStore = (event: any) => {
		event.target.blur();
		
		this.props.createDictionary(this.state['newDictionary']);
	}

	render() {
		console.log("render()...");
		
		let valClass = "";
		var row = 0;
		
		let rows = this.state['newDictionary'].map( (entry:any) => {
			valClass = this.validateRow(row);
    	return <DictionaryRow row={ row } valClass={ valClass } key={ row++ } data={ entry } onChange={ this.handleChange } onDelete={ this.handleDelete } />
		});

		return (<div>
							<div><table><tbody>
								<tr><th>From</th><th>To</th>
								<th><button onClick={ this.handleNewRow }>Add row</button></th>
								<th><button onClick={ this.handleStore }>Store</button></th></tr>
								{ rows }
							</tbody></table></div>
						</div>);
	}
}

const DictionaryRow = (props: any) => {
	return (
		<tr>
			<td>
				<input className={ props.valClass } id={ "1_" + props.row } type="text" value={ props.data.from } onChange = { props.onChange } />
			</td>
			<td>
				<input className={ props.valClass } id={ "2_" + props.row } type="text" value={ props.data.to } onChange = { props.onChange } />
			</td>
			<td>
				<button id={ props.row } onClick={ props.onDelete }>Delete row</button>
			</td>
		</tr>
	);
}

const mapStateToProps = (state :any) => ({
	state: state
});

export default connect(mapStateToProps, { createDictionary })(CreateDictionary);