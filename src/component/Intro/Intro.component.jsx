import "./Intro.component.scss"
import React, {useContext, useRef, useState} from 'react';
import AppContext from "../../App.context";
import classnames from "classnames"
import {LANG_EN, LANG_FR} from "../../App.reducer";

export const Intro = () => {

	const {setConfGame, isReady, reconfGame, confGame} = useContext(AppContext);
	const [isSubmit, setSubmit] = useState(false);
	const [noTimer, setNoTimer] = useState(confGame.notimer);

	const ref = useRef();

	function handleSubmit() {
		setConfGame({
			pseudo: ref.current[0].value,
			nbChance: parseInt(ref.current[1].value),
			time: parseInt(ref.current[2].value),
			notimer: ref.current[3].value === "true",
			lang: ref.current[4].value,
		});

		setSubmit(true);
	}

	function handleConf() {
		reconfGame();

		setSubmit(false);
	}

	function handleChangeNoTimer() {
		setNoTimer(ref.current[3].value !== "true");
	}

	return (
		<div className="intro">


			{!isReady ? (
				<>
					<h1>Bienvenue !</h1>

					<h2>Hey mon ami ! tu veux jouer avec moi ?</h2>

					<form ref={ref} className="intro__form" action="#" onSubmit={handleSubmit}>
						<div className="intro__form-wrapper-input">
							<label className="intro__input-wrapper">
							<span className="intro__form-label">
								Nom
							</span>
								<input className="intro__form-input" placeholder="Sarah" required
									   defaultValue={confGame.pseudo}
								/>
							</label>
							<label className="intro__input-wrapper">
								<span className="intro__form-label">
									Nombre de tentatives
								</span>
								<input
									className="intro__form-input" type="number" placeholder="5" min={1}
									max={8}
									required
									defaultValue={confGame.nbChance}
								/>
							</label>
							<label className="intro__input-wrapper">
								<span className="intro__form-label">
									Le temps pour trouver le mot
								</span>
								<input className="intro__form-input" type="number"
									   placeholder="8"
									   min={8}
									   max={50}
									   required
									   disabled={noTimer}
									   defaultValue={confGame.time}
								/>
							</label>
							<label className="intro__input-wrapper">
								<span className="intro__form-label">
									Temps illimité
								</span>
								<input
									className={classnames("intro__form-input", "intro__form-checkbox", {"intro__form-checkbox--valid": noTimer})}
									type="checkbox"
									onClick={handleChangeNoTimer}
									defaultValue={noTimer}
								/>
							</label>
							<label className="intro__input-wrapper">
							<span className="intro__form-label">
								Langue souhaitée
							</span>
								<select className="intro__form-input" placeholder="Langue" defaultValue={confGame.lang}>
									<option value={LANG_FR}>{LANG_FR}</option>
									<option value={LANG_EN}>{LANG_EN}</option>
								</select>
							</label>


						</div>
						<input className="intro__form-submit" type="submit" value="Attache ta tuque !"
							   disabled={isSubmit}/>
					</form>
				</>
			) : (
				<>
					<h1>C'est parti</h1>

					<h2>Pas de chicane dans ma cabane </h2>
					<button className="intro__reconf" onClick={handleConf}>RECONF</button>
				</>
			)}


		</div>
	);
};
