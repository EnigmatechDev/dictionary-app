import { NEW_DICTIONARY, UPDATE_DICTIONARY, DELETE_DICTIONARY, SELECT_DICTIONARY } from './types';

// this ES6 syntax is the same as above function
/*
export const fetchPosts = () => dispatch => {
	console.log('fetchPosts fetching...');
	fetch('https://jsonplaceholder.typicode.com/posts')
		.then(res => res.json())
		.then(posts => 
			dispatch({
				type: FETCH_POSTS,
				payload: posts
			})
		);
}
*/
export function selectDictionary(idx:Number) {
	console.log("selectDictionary " + idx);

	return function(dispatch:any) {
		console.log("selectDictionary dispatch()");
		console.log( idx );
		dispatch({
				type: SELECT_DICTIONARY,
				payload: idx
		});
	}
}

export function createDictionary(dictionary:any) {
	console.log("createDictionary " + dictionary);

	return function(dispatch:any) {
		console.log("createDictionary dispatch()");
		console.log( dictionary );
		dispatch({
				type: NEW_DICTIONARY,
				payload: dictionary
		});
	}
}

export function updateDictionary(dictionary:any) {
	console.log("updateDictionary " + dictionary);

	return function(dispatch:any) {
		console.log("updateDictionary dispatch()");
		console.log( dictionary );
		dispatch({
				type: UPDATE_DICTIONARY,
				payload: dictionary
		});
	}
}

export function deleteDictionary(idx:Number) {
	console.log("deleteDictionary ");

	return function(dispatch:any) {
		console.log("deleteDictionary dispatch()");
		dispatch({
				type: DELETE_DICTIONARY,
				payload: idx
		});
	}
}
