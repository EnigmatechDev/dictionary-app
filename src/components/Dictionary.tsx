import * as React from 'react';
import { connect } from 'react-redux';
import { createDictionary } from '../actions/dictionaryActions';
import { updateDictionary } from '../actions/dictionaryActions';
import { changeView } from '../actions/dictionaryActions';

class Dictionary extends React.Component<any> {

	constructor(props: any) {
		super(props);
	
		console.log("Dictionary constructor createNew");

		if ( this.props.view === "createNew") {
			this.state = {
				// A hardcoded dictionary for testing
				dictionary : [
					{ from: "Anthracite", to: "Gray" },
					{ from: "Midnight Black", to: "Black" },
					{ from: "Mystic Silver", to: "Silver" }
				]
			}
		} else {
			this.state = {
				dictionary : this.props.dictionaries[ this.props.selected ]
			}
		}

		this.handleStore = this.handleStore.bind(this);
		this.validateRow = this.validateRow.bind(this);
		this.handleNewRow = this.handleNewRow.bind(this);
	}

	validateRow(row: number) {
		let count = 0;
		let valClass = "valid"

		for(var i=0; i < this.state['dictionary'].length; i++) {
			if( this.state['dictionary'][row].from === this.state['dictionary'][i].from )
				count++;
		}
	
		if(count > 1)
			valClass = "inValid";

		return valClass;
	}

	handleNewRow (event: any) {
		event.target.blur();
		console.log("handleNewRow");

		let dictionary = this.state['dictionary'];
		dictionary.push({from: "", to: ""});
		console.log(dictionary);

		this.setState({dictionary: dictionary});
		console.log(this.state['dictionary']);
	}

	handleTextChange = (event: any) => {

		console.log("ViewEdit handleChange");
		let dictionary = this.state['dictionary'];
		let cell = event.target.id.split("_");

		if(cell[0] == 1) {
			// the From column
			dictionary[ cell[1] ] = { from: event.target.value, to: dictionary[ cell[1] ].to };
		} else
		
		if(cell[0] == 2) {
			// the To column
			dictionary[ cell[1] ] = { from: dictionary[ cell[1] ].from, to: event.target.value };
		}
		
		this.setState({dictionary: dictionary});
	}

	handleDeleteRow = (event: any) => {
		event.target.blur();
		console.log("handleDelete " + event.target.id);

		let dictionary = this.state['dictionary'];

		// remove corresponding element from array
		dictionary.splice(event.target.id, 1);
		this.setState({dictionary: dictionary});
	}

	handleStore = (event: any) => {
		event.target.blur();

		if (this.props.view === "createNew" ) {

			this.props.createDictionary(this.state['dictionary']);
			this.props.changeView("viewEdit");

		} else {
			this.props.updateDictionary(this.state['dictionary']);
		}
	}

	render() {
		console.log("ViewEdit render()...");

		console.log("ViewEdit props");
		console.log(this.props);

		console.log("ViewEdit state");
		console.log(this.state);

		let title = "Create new dictionary";
		let valClass = "";
		var row = 0;
		
		let rows = this.state['dictionary'].map( (entry:any) => {
			valClass = this.validateRow(row);

			return ( 	<DictionaryRow row={ row } valClass={ valClass } key={ row++ } data={ entry }
								onChange={ this.handleTextChange } onDelete={ this.handleDeleteRow } /> );
		});

		if (this.props.view === "viewEdit")
			title = "View / edit dictionary";

		return (<div><h3>{ title }</h3>
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
	view: state.root.view,
	selected: state.root.selected,
	dictionaries: state.root.dictionaries
});

export default connect(mapStateToProps, { changeView, createDictionary, updateDictionary })(Dictionary);
