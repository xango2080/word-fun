import React, {useEffect, useReducer} from 'react';
import {
	ERROR_CHANCE,
	GAME_FINISH,
	GAME_STARTED,
	GameContextReducer,
	initialState,
	NEW_PROPOSAL,
	PAUSE
} from "./Game.reducer";

const GameContext = React.createContext();

export default GameContext;


export const GameContextProvider = ({word, confGame, children}) => {

	const [state, dispatch] = useReducer(GameContextReducer, initialState);

	useEffect(() => {
		dispatch({type: GAME_STARTED})
	}, [word]);

	function startGame() {
		dispatch({type: GAME_STARTED})
	}

	function finishGame(type) {
		dispatch({type: GAME_FINISH, payload: type})
	}

	function addProposal(value) {
		if (word.length !== value.length) {
			value = '-'.repeat(word.length);
		}

		dispatch({type: NEW_PROPOSAL, payload: value});

		if (value === word) {
			finishGame("SUCCES")
		} else if (state.currentTest + 1 >= confGame.nbChance) {
			finishGame("FAIL")
		} else {
			dispatch({type: ERROR_CHANCE})
		}
	}

	function countdownIsFinish() {
		addProposal('-'.repeat(word.length))
	}

	function setPauseGame() {
		dispatch({type: PAUSE})
	}

	return (
		<GameContext.Provider
			value={{
				...state,
				word,

				nbTest: confGame.nbChance,
				secondByChance: confGame.time,
				notimer: confGame.notimer,

				setPauseGame,

				addProposal,

				countdownIsFinish,

				startGame,
				finishGame,
			}}
		>
			{children}
		</GameContext.Provider>
	);
}