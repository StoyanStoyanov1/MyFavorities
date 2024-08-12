//config
import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

//configurations
import Path from "./utils/paths.js";

//components
import Header from "./components/header/Header.jsx";
import Register from "./components/аuthentication/Register.jsx";
import Login from "./components/аuthentication/Login.jsx"

//context
import {LanguageProvider} from "./context/LanguageContext.jsx";


function App() {
	return (
		<LanguageProvider>
			<div id='box'>
				<Header/>
				<Routes>
					<Route path={Path.Register} element={<Register/>}/>
					<Route path={Path.Login} element={<Login/>}/>
				</Routes>
			</div>
		</LanguageProvider>
	)
}

export default App;