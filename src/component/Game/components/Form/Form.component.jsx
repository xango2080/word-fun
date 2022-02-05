import "./Form.component.scss"
import React, {useContext, useRef} from 'react';
import GameContext from "../../context/Game.context";


export const Form = () => {
	const {isOver, addProposal, setPauseGame} = useContext(GameContext);
	const ref = useRef();

	function submit(e) {
		e.stopPropagation();
		e.preventDefault();

		if (ref.current.value) {
			setPauseGame();

			const inputvalue = ref.current.value
				.toUpperCase()
				.trim()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "");

			addProposal(inputvalue);
		}
	}

	return (
		<form className="form" action="#" onSubmit={submit}>
			<input className="form__input" placeholder="Try !!!" ref={ref} disabled={isOver} required minLength={5}/>
			<input className="form__submit" type="submit" value="Valider" disabled={isOver}/>
		</form>
	);
};
