import { useContext } from "react"
import OrderSummary from "../../components/OrderSummary/OrderSummary"
import ProductList from "../../components/ProductList/ProductList"
import products from "../../shared/constants/fakeapi"
import CheckoutContext, { CheckoutProvider } from "../../context"

const ShoppingCart = () => {
	const { cart } = useContext(CheckoutContext)

	return (
		<>
			<CheckoutProvider >
				<ProductList products={cart.products} />
				<OrderSummary />
			</CheckoutProvider>
		</>
	)
}

export default ShoppingCart
