import "./App.css"
import { Routes, Route } from "react-router-dom"
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart"

function App() {
	return (
		<main className='App'>
			<Routes>
				<Route path='/' element={<ShoppingCart />} />
			</Routes>
		</main>
	)
}

export default App
