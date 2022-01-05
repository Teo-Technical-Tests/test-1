import { useContext } from "react"
import OrderSummary from "../../components/OrderSummary/OrderSummary"
import ProductList from "../../components/ProductList/ProductList"
import CheckoutContext from "../../context"

const ShoppingCart = () => {
	const { cart } = useContext(CheckoutContext)

	return (
		<>
			<ProductList products={cart.products} />
			<OrderSummary />
		</>
	)
}

export default ShoppingCart
