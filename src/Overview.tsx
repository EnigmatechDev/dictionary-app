import * as React from 'react';

interface IProps {
	store: any;
	onSelect: Function,
	onDelete: Function
}

interface IState {
}

export class Overview extends React.Component<IProps, IState> {

	constructor(props: IProps) {
		super(props);
	};

	handleSelect = (event: any) => {
		event.target.blur();
		console.log("handleSelect " + event.target.id.split('row')[1]);

		this.props.onSelect( event.target.id.split('row')[1] );
	}

	handleDelete = (event: any) => {
		event.target.blur();
		console.log("handleDelete " + event.target.id.split('row')[1]);

		this.props.onDelete( event.target.id.split('row')[1] );
	}

	render() {
		console.log("render()...");
		
		let rows = [];

		for (var idx = 0; idx < this.props.store.length; idx++){
      let rowId = `row${idx}`;
			
			rows.push(<tr key={ idx }>
									<td>Dictionary { idx }</td>
									<td><button id={ rowId } onClick={ this.handleSelect }>View/Edit</button></td>
									<td><button id={ rowId } onClick={ this.handleDelete }>Delete</button></td>
								</tr>);
    }

		return (<div>
							<div>
								<p>
								There are currently { this.props.store.length } dictionaries in memory.
								</p>
								<table>
									<tbody>{ rows }</tbody>
								</table>
							</div>
						</div>);
	}
}
