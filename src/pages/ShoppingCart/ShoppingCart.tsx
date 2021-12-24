import OrderSummary from "../../components/OrderSummary/OrderSummary"
import ProductList from "../../components/ProductList/ProductList"
import products from "../../shared/constants/fakeapi"

const ShoppingCart = () => {
	return (
		<>
			<ProductList products={products} />
			<OrderSummary />
		</>
	)
}

export default ShoppingCart
