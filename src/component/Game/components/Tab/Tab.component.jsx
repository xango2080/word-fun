import "./Tab.component.scss";
import React, {memo, useContext, useMemo} from 'react';
import GameContext from "../../context/Game.context";
import classnames from "classnames";

const CreateTd = memo(({line, currentTest, proposal, wordSplitted, letterCounter}) => {

    const proposalSplitted = proposal && [...proposal];

    if (proposalSplitted) {
        for (let i = 0; i < wordSplitted.length; i++) {
            if (wordSplitted[i] === proposalSplitted[i]) {
                letterCounter[proposalSplitted[i]]--;
            }
        }
    }


    return wordSplitted.map((letter, i) => {
        let child = "";

        if (i === 0 && (currentTest === line || proposalSplitted && proposalSplitted[0] === "-")) {
            child = wordSplitted[0];
        } else if (proposalSplitted && proposalSplitted[i] && proposalSplitted[i] !== "-") {
            child = proposalSplitted[i];
        }

        const isgood = proposalSplitted && letter === proposalSplitted[i];

        let notPlaced = false;
        if (proposalSplitted && letter !== proposalSplitted[i] && wordSplitted.includes(proposalSplitted[i]) && letterCounter[proposalSplitted[i]] > 0) {
            notPlaced = true;
            letterCounter[proposalSplitted[i]]--;
        }

        return (<td
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
        )
    })
}, (prev, next) => prev.proposal === next.proposal);


export const Tab = () => {
    const {currentTest, nbTest, word, proposal} = useContext(GameContext);
    const wordSplitted = useMemo(() => [...word], [word]);

    const letterCounter = useMemo(() => wordSplitted.reduce(
        (res, char) => (res[char] = (res[char] || 0) + 1, res),
        {}
    ), [wordSplitted]);

    return (
        <table className="tab">
            <tbody>
            {[...Array(nbTest)].map((e, i) => (
                <tr key={i}>
                    <CreateTd
                        line={i}
                        currentTest={currentTest}
                        proposal={proposal[i]}
                        wordSplitted={wordSplitted}
                        letterCounter={{...letterCounter}}
                    />
                </tr>
            ))}
            </tbody>
        </table>
    )
};

export default Tab;