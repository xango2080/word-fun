import "./Tab.component.scss";
import React, {useContext} from 'react';
import GameContext from "../../context/Game.context";
import classnames from "classnames";

const CreateTd = ({line}) => {

	const {currentTest, word, proposal} = useContext(GameContext);

	let elements = [];

	const wordSplitted = word.split('');
	const proposalSplitted = proposal[line] && proposal[line].split('');

	const result = wordSplitted.reduce((res, char) => (res[char] = (res[char] || 0) + 1, res), {});

	for (let i = 0; i < word.length; i++) {
		if (proposalSplitted && wordSplitted[i] === proposalSplitted[i]) {
			result[proposalSplitted[i]]--;
		}
	}

	for (let i = 0; i < word.length; i++) {
		let child = "";

		if (i === 0 && (currentTest === line || proposalSplitted && proposalSplitted[0] === "-")) {
			child = wordSplitted[0];
		} else if (proposalSplitted && proposalSplitted[i] && proposalSplitted[i] !== "-") {
			child = proposalSplitted[i];
		}

		const isgood = proposalSplitted && wordSplitted[i] === proposalSplitted[i];

		let notPlaced = false;
		if (proposalSplitted && wordSplitted[i] !== proposalSplitted[i] && wordSplitted.includes(proposalSplitted[i]) && result[proposalSplitted[i]] > 0) {
			notPlaced = true;
			result[proposalSplitted[i]]--;
		}

		elements.push(
			<td
				key={i}
				className={classnames("tab__item", {
					"tab__item--find": isgood,
					"tab__item--not-placed": notPlaced,
					"tab__item--error": proposalSplitted && proposalSplitted[i] === "-",
				})
				}
			>
				{child}
			</td>
		);
	}
	return elements;
};

function createElements(nbTest) {
	let elements = [];
	for (let i = 0; i < nbTest; i++) {
		elements.push(<tr key={i}><CreateTd line={i}/></tr>);
	}
	return elements;
}

export const Tab = () => {
	const {nbTest} = useContext(GameContext);

	return (
		<table className="tab">
			<tbody>
			{createElements(nbTest)}
			</tbody>
		</table>
	)
}