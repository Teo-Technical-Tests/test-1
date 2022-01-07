import "./App.css"
import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import ShoppingCart from "./components/pages/ShoppingCart/ShoppingCart"
import Checkout from "./shared/services/Checkout"
import { CheckoutProviderWrapper } from "./context"
import { ProductModal } from "./components/Modals"
import { ProductInCart } from "./types"

type ModalState = { isOpen: boolean; product: ProductInCart | null }

function App({ co }: { co: Checkout }) {
	//TODO change to context or useModal
	const [modalInfo, setModalInfo] = useState<ModalState>({ isOpen: false, product: null })
	const closeModal = () => setModalInfo({ isOpen: false, product: null })
	const openModal = (product: ProductInCart) => setModalInfo({ isOpen: true, product })

	//Comment: We had to wrap the checkout provider in order to handle react no re-rendering
	//when the checkout.cart was modified. The cart mirrored in the state of the component and it exposes
	//the methods for un/scaning products.

	return (
		<>
			<main className='App'>
				<CheckoutProviderWrapper co={co}>
					{modalInfo.isOpen && modalInfo.product && (
						<ProductModal product={modalInfo.product} onClose={() => closeModal()} />
					)}
					<Routes>
						<Route path='/' element={<ShoppingCart openModal={openModal} />} />
					</Routes>
				</CheckoutProviderWrapper>
			</main>
		</>
	)
}

export default App
