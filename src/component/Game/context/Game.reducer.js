import React from 'react';

export const initialState = {
	proposal: [],
	isOver: false,
	pauseGame: false,
	isStopped: false,
	currentTest: 0,
	type: null,
};

export const TIME_DOWN = "TIME_DOWN";
export const NEXT_CHANCE = 'NEXT_CHANCE';
export const GAME_FINISH = 'GAME_FINISH';
export const GAME_STARTED = 'GAME_STARTED';
export const PAUSE = 'PAUSE';

export const ERROR_CHANCE = 'ERROR_CHANCE';
export const NEW_PROPOSAL = 'NEW_PROPOSAL';

export const GameContextReducer = (state = initialState, action) => {
	switch (action.type) {
		case TIME_DOWN:
			return {
				...state,
				isOver: true,
			};
		case PAUSE:
			return {
				...state,
				pauseGame: true,
			};
		case NEW_PROPOSAL: {
			return {
				...state,
				proposal: [...state.proposal, action.payload],
				pauseGame: true,
				isOver: true,
			};
		}
		case NEXT_CHANCE:
			return {
				...state,
				currentTest: state.currentTest++,
				isOver: false,
				pauseGame: true,
			};
		case ERROR_CHANCE:
			return {
				...state,
				isOver: false,
				pauseGame: false,
				currentTest: state.currentTest + 1,
			};
		case GAME_FINISH:
			return {
				...state,
				isOver: true,
				pauseGame: true,
				isStopped: true,
				type: action.payload
			};
		case GAME_STARTED:
			return initialState;
		default:
			return initialState;
	}
}