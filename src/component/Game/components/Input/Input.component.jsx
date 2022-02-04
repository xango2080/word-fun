import "./Input.component.scss"
import React, {useContext, useRef} from 'react';
import GameContext from "../../context/Game.context";


export const Input = () => {
	const {isOver, addProposal, setPauseGame} = useContext(GameContext);
	const ref = useRef();

	function submit(e) {
		e.stopPropagation();
		e.preventDefault();

		setPauseGame();

		let inputvalue = ref.current.value.toUpperCase();

		addProposal(inputvalue);
	}

	return (
		<>
			<form className="form" action="#" onSubmit={submit}>
				<input className="form__input" placeholder="Try !!!" ref={ref} disabled={isOver}/>
				<input className="form__submit" type="submit" value="Valider" disabled={isOver}/>
			</form>
		</>
	);
};
