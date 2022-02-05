import wordInEnglish from "./dicoEn";
import wordInFrench from "./dicoFr";
import React from 'react';

export const LANG_FR = "FR";
export const LANG_EN = "EN";

const lib = new Map();

lib.set(LANG_FR, wordInFrench);
lib.set(LANG_EN, wordInEnglish);

export const initialState = {
	confGame: {
		pseudo: null,
		nbChance: 5,
		time: 20,
		notimer: true,
		lang: LANG_FR,
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
				words: lib.get(action.payload.lang)
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