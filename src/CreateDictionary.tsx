import * as React from 'react';
import { Dictionary } from './Dictionary';

interface IProps {
	id: Number,
	onStore: Function
}

interface IState {
	dictId: Number,
	tData: { from: string, to: string }[]
}

export class CreateDictionary extends React.Component<IProps, IState> {

	state: IState;

	constructor(props: IProps) {
		super(props);

		console.log("CreateDictionary Id " + props.id);

		this.state = {
			dictId: props.id,
			tData: [{
				from: "Anthracite",
				to: "Dark Grey"
			}, {
				from: "Midnight Black",
				to: "Black"
			}, {
				from: "Mystic Silver",
				to: "Silver"
			}]
		}
	};

	render() {
		console.log("CreateDictionary.render()...");
		
		return (<div><Dictionary id={ this.state.dictId } onStore={ this.props.onStore } tData={ this.state.tData } /></div>);
	}
}
