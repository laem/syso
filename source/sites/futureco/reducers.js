let initialState = {
	scenario: 'C',
	progression: {},
	items: [{ dottedName: 'services publics' }],
	crossedSuggestions: [],
	done: false,
}

let reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_SCENARIO':
			return {
				...state,
				scenario: action.scenario,
			}
		case 'SET_PROGRESSION':
			return {
				...state,
				progression: action.progression,
			}
		case 'SET_ITEMS':
			return {
				...state,
				items: action.items,
			}
		case 'ADD_ITEMS':
			return {
				...state,
				items: [...state.items, ...action.items],
			}

		case 'CROSS_SUGGESTION':
			return {
				...state,
				crossedSuggestions: [...state.crossedSuggestions, action.suggestion],
			}
		default:
			throw new Error('Unexpected action')
	}
}
export { initialState, reducer }
