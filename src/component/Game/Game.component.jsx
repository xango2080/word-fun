import "./Game.component.scss"
import React, {useContext, useEffect, useState} from 'react';
import AppContext from "../../App.context";
import {Counter} from "./components/Counter/Counter.component";
import {Form} from "./components/Form/Form.component";
import {Tab} from "./components/Tab/Tab.component";
import {GameContextProvider} from "./context/Game.context";
import {NewGameButton} from "./components/NewGameButton/NewGameButton.component";
import {Message} from "./components/Message/Message.component";

export const Game = () => {

	const {isStarted, isReady, startGame, words, confGame} = useContext(AppContext);

	const [wordToDiscover, setWordToDiscover] = useState(null);

	useEffect(() => {
		isReady && startGame();
	}, [isReady]);

	useEffect(() => {
		isReady && setNewWord();
	}, [isReady]);

	function calculateNewWord() {
		return (words[Math.floor(Math.random() * (words.length - 0 + 1))])
	}

	function setNewWord() {
		setWordToDiscover(calculateNewWord())
	}

	return (
		<div className="game">
			{isStarted && wordToDiscover && (
				<GameContextProvider word={wordToDiscover} confGame={confGame}>
					<Counter/>
					<div className="game__wrapper">
						<Form/>
						<Tab/>
					</div>
					<Message/>
					<NewGameButton onClick={setNewWord}>NEW WORD</NewGameButton>
				</GameContextProvider>
			)}
		</div>
	);
};
