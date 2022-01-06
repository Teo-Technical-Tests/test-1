import { useContext } from "react"
import OrderSummary from "../../components/OrderSummary/OrderSummary"
import ProductList from "../../components/ProductList/ProductList"
import CheckoutContext from "../../context"

interface Props {
	openModal: () => void
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
