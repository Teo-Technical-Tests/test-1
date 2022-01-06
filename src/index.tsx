import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import Checkout from "./shared/services/Checkout"

//Comment: We pass the context as a prop so the test can reinstantiate it before each test
const co = new Checkout()
ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App co={co} />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
)
reportWebVitals()
