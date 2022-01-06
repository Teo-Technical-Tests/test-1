import "./App.css"
import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart"
import Checkout from "./shared/services/Checkout"
import { CheckoutProviderWrapper } from "./context"
import { ProductModal } from "./components/Modals"

function App({ co }: { co: Checkout }) {
	//TODO change to context or useModal
	const [isOpen, setIsOpen] = useState(false)
	const closeModal = () => setIsOpen(false)
	const openModal = () => setIsOpen(true)

	//Comment: We had to wrap the checkout provider in order to handle react no re-rendering
	//when the checkout.cart was modified. The cart mirrored in the state of the component and it exposes
	//the methods for un/scaning products.

	return (
		<>
			<main className='App'>
				<CheckoutProviderWrapper co={co}>
					{isOpen && <ProductModal product={co.cart[0]} onClose={() => closeModal()} />}
					<Routes>
						<Route path='/' element={<ShoppingCart openModal={openModal} />} />
					</Routes>
				</CheckoutProviderWrapper>
			</main>
		</>
	)
}

export default App
