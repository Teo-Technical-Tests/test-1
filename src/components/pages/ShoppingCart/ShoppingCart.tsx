import { useContext } from "react"
import OrderSummary from "../../OrderSummary/OrderSummary"
import ProductList from "../../ProductList/ProductList"
import CheckoutContext from "../../../context/Checkout"
import { ProductInCart } from "../../../types"

interface Props {
	openModal: (product: ProductInCart) => void
}

const ShoppingCart = ({ openModal }: Props) => {
	const { cart } = useContext(CheckoutContext)

	return (
		<>
			<ProductList openModal={openModal} products={cart.products} />
			<OrderSummary />
		</>
	)
}

export default ShoppingCart
