import "./Game.component.scss"
import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../../App.context";
import {Counter} from "./components/Counter/Counter.component";
import {Input} from "./components/Input/Input.component";
import {Tab} from "./components/Tab/Tab.component";
import {GameContextProvider} from "./context/Game.context";
import {NewGameButton} from "./components/NewGameButton/NewGameButton.component";
import {Message} from "./components/Message/Message.component";

export const Game = () => {

	const {isStarted, isReady, startGame, wordInFrench, confGame} = useContext(AppContext);

	const [wordToDiscover, setWordToDiscover] = useState(null);

	useEffect(() => {
		isReady && startGame();
	}, [isReady]);

	useEffect(() => {
		isReady && setNewWord();
	}, [isReady]);

	function calculateNewWord() {
		return (wordInFrench[Math.floor(Math.random() * (wordInFrench.length - 0 + 1))])
	}

	function setNewWord() {
		setWordToDiscover(calculateNewWord())
	}

	return (
		<div className="game">
			{isStarted && (
				<GameContextProvider word={wordToDiscover} confGame={confGame}>
					<Counter/>
					<Input/>
					<Tab/>

					<Message/>
					<NewGameButton onClick={setNewWord}>NEW WORD</NewGameButton>
				</GameContextProvider>
			)}
		</div>
	);
};
