import * as React from 'react';

interface IProps {
	id: Number,
	onStore: Function,
	tData: { from: string, to: string }[]
}

interface IState {
	dictId: Number,
	tData: { from: string, to: string }[]
}

export class Dictionary extends React.Component<IProps, IState> {

	state: IState;

	constructor(props: IProps) {
		super(props);

		console.log("NewDictionary Id " + props.id);

		this.state = {
			dictId: props.id,
			tData: props.tData
		}
	};

	validateRow(row: number) {
		console.log("isDuplicate...");

		let count = 0;
		let valClass = "valid"

		for(var i=0; i < this.state.tData.length; i++) {
			if( this.state.tData[row].from === this.state.tData[i].from )
				count++;
		}
	
		if(count > 1)
			valClass = "inValid";
		return valClass;
	}

	handleNewRow = (event: any) => {
		event.target.blur();
		console.log("handleClick...");

		let newTData = this.state.tData;
		newTData.push({from: "-", to: "-"});
		console.log(newTData);

		this.setState({tData: newTData});
		console.log(this.state.tData);
	}

	handleChange = (event: any) => {

		console.log("handleChange...");
		let newTData = this.state.tData;
		let cell = event.target.id.split("_");

		if(cell[0] == 1) {
			// the From column
			newTData[ cell[1] ] = { from: event.target.value, to: newTData[ cell[1] ].to };
		} else
		
		if(cell[0] == 2) {
			// the To column
			newTData[ cell[1] ] = { from: newTData[ cell[1] ].from, to: event.target.value };
		}
		
		this.setState({tData: newTData});
	}

	handleDelete = (event: any) => {
		event.target.blur();
		console.log("handleDelete " + event.target.id);

		let newTData = this.state.tData;

		// remove corresponding element from array
		newTData.splice(event.target.id, 1);
		this.setState({tData: newTData});
	}

	handleStore = (event: any) => {
		event.target.blur();

		console.log("handleStore " + this.state.dictId);
		this.props.onStore(this.state.dictId, this.state.tData);
	}

	render() {
		console.log("render()...");
		
		let valClass = "";
		var row = 0;
		let rows = this.state.tData.map(entry => {
			valClass = this.validateRow(row);
      return <DictionaryRow row={ row } valClass={ valClass } key={ row++ } data={ entry } onChange={ this.handleChange } onDelete={ this.handleDelete } />
		});
		return (<div>
							<div><table><tbody><tr><th>From</th><th>To</th>
							<th><button onClick={ this.handleNewRow }>Add row</button></th>
							<th><button onClick={ this.handleStore }>Store</button></th></tr>
							{ rows }</tbody></table></div>
						</div>);
	}
}

const DictionaryRow = (props: any) => {
	return (
		<tr>
			<td>
				<input className={ props.valClass } id={ "1_" + props.row } type="text" value={ props.data.from } onChange={ props.onChange } />
			</td>
			<td>
				<input className={ props.valClass } id={ "2_" + props.row } type="text" value={ props.data.to } onChange={ props.onChange} />
			</td>
			<td>
				<button id={ props.row } onClick={ props.onDelete }>Delete row</button>
			</td>
		</tr>
	);
}
