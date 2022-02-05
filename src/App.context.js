import React, {useReducer} from 'react';
import {AppContextReducer, CONF_GAME, GAME_STARTED, GAME_STOPPED, initialState, RECONF} from "./App.reducer";

const AppContext = React.createContext();

export default AppContext;


export const AppContextProvider = ({children}) => {

	const [state, dispatch] = useReducer(AppContextReducer, initialState);

	function setConfGame(value) {
		dispatch({type: CONF_GAME, payload: value})
	}

	function startGame() {
		dispatch({type: GAME_STARTED})
	}

	function stopGame() {
		dispatch({type: GAME_STOPPED})
	}

	function reconfGame() {
		dispatch({type: RECONF})
	}

	return (
		<AppContext.Provider
			value={{
				...state,

				setConfGame,
				reconfGame,

				startGame,
				stopGame,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};



