import "./App.css"
import { Routes, Route } from "react-router-dom"
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart"
import Checkout from "./shared/services/Checkout"
import { CheckoutProviderWrapper } from "./context"

function App() {
	return (
		<main className='App'>
			<CheckoutProviderWrapper co={new Checkout()}>
				<Routes>
					<Route path='/' element={<ShoppingCart />} />
				</Routes>
			</CheckoutProviderWrapper>
		</main>
	)
}

export default App
