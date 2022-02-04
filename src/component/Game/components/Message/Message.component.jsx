import "./Message.component.scss";
import React, {useContext} from 'react';
import GameContext from "../../context/Game.context";

export const Message = () => {
	const {isOver, isStopped, type} = useContext(GameContext);

	if (!isOver && !isStopped) {
		return null;
	}

	if (type === "SUCCES") {
		return (
			<strong className="message message--succes">C’est tiguidou</strong>
		)
	}
	if (type === "FAIL") {
		return (
			<strong className="message message--fail">Lâche pas la patate</strong>
		)
	}


	return null;
}