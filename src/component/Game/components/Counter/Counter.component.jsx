import "./Counter.component.scss"
import React, {useContext, useEffect, useRef} from 'react';
import GameContext from "../../context/Game.context";
import Countdown from "react-countdown/dist/index";

export const Counter = () => {
	const {countdownIsFinish, isStopped, pauseGame, secondByChance, notimer} = useContext(GameContext);

	const ref = useRef();

	useEffect(() => {
		!notimer && isStopped && ref.current.stop();
	}, [isStopped]);

	useEffect(() => {
		!notimer && pauseGame && ref.current.pause();
	}, [pauseGame]);


	useEffect(() => {
		!notimer && !pauseGame && ref.current.start();
	}, [pauseGame]);


	function calculateColor(second) {
		const result = second / secondByChance * 100;

		let className = "base-timer";

		if (result >= 60) {
			className += "--good";
		} else if (result >= 40) {
			className += "--warning";
		} else {
			className += "--urgency"
		}

		return className;
	}

	console.log(notimer)
	if (!!notimer) {
		return null;
	}

	console.log("test")

	return (
		<Countdown
			ref={ref}
			date={Date.now() + secondByChance * 1000}
			precision={3}
			intervalDelay={1000}
			onComplete={countdownIsFinish}
			renderer={({seconds}) => (
				<div className={`base-timer ${calculateColor(seconds)}`}>
					<svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
						<g className="base-timer__circle">
							<circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"/>
							<path
								id="base-timer-path-remaining"
								strokeDasharray={`${seconds / 60 * 283} 283`}
								className="base-timer__path-remaining"
								d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
							/>
						</g>
					</svg>
					<span id="base-timer-label" className="base-timer__label">{seconds}</span>
				</div>
			)
			}
		/>
	);
};
