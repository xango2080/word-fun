import './App.scss';
import React from "react";
import {AppContextProvider} from "./App.context";
import {Intro} from "./component/Intro/Intro.component";
import {Game} from "./component/Game/Game.component";

function App() {

	return (
		<div className="App">
			<AppContextProvider>
				<Intro/>
				<Game/>
			</AppContextProvider>
		</div>
	);
}

export default App;