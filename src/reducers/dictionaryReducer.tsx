import { NEW_DICTIONARY, UPDATE_DICTIONARY, DELETE_DICTIONARY, SELECT_DICTIONARY } from '../actions/types';

const initialState = {
	selected: -1,
	dictionaries: []
}

export default function dictionaryReducer(state = initialState, action: any) {
	
	console.log(state);
	console.log(action);

	switch (action.type) {

		case NEW_DICTIONARY: {
			console.log('NEW_DICTIONARY Reducer');
			const dictionary = action.payload;
			const dictionaries = [...state.dictionaries, dictionary];
			const selected = dictionaries.length-1;
			return { selected, dictionaries };
		}
		
		case SELECT_DICTIONARY: {
			console.log('SELECT_DICTIONARY Reducer');
			const dictionaries = state.dictionaries;
			const selected = action.payload;
			console.log(selected);
			return { selected, dictionaries };	
		}

		case UPDATE_DICTIONARY: {
			console.log('UPDATE_DICTIONARY Reducer');
			const dictionaries = state.dictionaries;
			const selected = state.selected;

			// FIXME need to work out TS indexing arrays!!
			// dictionaries[action.payload.id] = action.payload.dictionary;

			return { selected, dictionaries };
		}
			
		case DELETE_DICTIONARY: {
			console.log('DELETE_DICTIONARY Reducer');
			const dictionaries = state.dictionaries;
			let selected = state.selected;
			dictionaries.splice(selected, 1);

			if (selected > dictionaries.length - 1)
				selected = dictionaries.length - 1;
			return { selected, dictionaries };	
		}
		
		default:
			console.log("action " + action.type);
			return state;	
	}
}