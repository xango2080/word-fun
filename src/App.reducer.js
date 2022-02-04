import React from 'react';

export const initialState = {
	confGame: {
		pseudo: null,
		nbChance: 5,
		time: 20,
		notimer: false,
	},
	isStarted: false,
	isStopped: false,
	isReady: false,
};

export const RECONF = "RECONF";
export const CONF_GAME = "CONF_GAME";
export const GAME_STARTED = 'GAME_STARTED';
export const GAME_STOPPED = 'GAME_STOPPED';

export const AppContextReducer = (state = initialState, action) => {
	switch (action.type) {
		case RECONF:
			return {
				...state,
				isReady: false,
				isStopped: false,
				isStarted: false,
			};
		case CONF_GAME:
			return {
				...state,
				confGame: action.payload,
				isReady: true,
				isStopped: false,
				isStarted: false,
			};
		case GAME_STOPPED:
			return {
				...initialState,
				isStopped: true,
				isStarted: false,
			};
		case GAME_STARTED:
			return {
				...state,
				isStopped: false,
				isStarted: true,
			};
		default:
			throw new Error();
	}
}