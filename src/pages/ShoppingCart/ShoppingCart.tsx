import { useContext } from "react"
import OrderSummary from "../../components/OrderSummary/OrderSummary"
import ProductList from "../../components/ProductList/ProductList"
import products from "../../shared/constants/fakeapi"
import CheckoutContext, { CheckoutProvider } from "../../context"

const ShoppingCart = () => {
	const { cart, co } = useContext(CheckoutContext)

	return (
		<>
			<CheckoutProvider value={{ cart, co }}>
				<ProductList products={cart.products} />
			</CheckoutProvider>
			<OrderSummary />
		</>
	)
}

export default ShoppingCart
