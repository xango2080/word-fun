import "./NewGameButton.component.scss";
import React, {useContext} from 'react';
import GameContext from "../../context/Game.context";

export const NewGameButton = ({children, onClick}) => {
	const {isOver, isStopped} = useContext(GameContext);

	if (!isOver && !isStopped) {
		return null;
	}

	return (
		<button className="new-game-button" onClick={onClick}>{children}</button>
	)
};

export default NewGameButton;