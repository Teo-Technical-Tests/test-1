import OrderSummary from "../../components/OrderSummary/OrderSummary"
import ProductList from "../../components/ProductList/ProductList"
import products from "../../shared/constants/fakeapi"
import Checkout from "../../shared/services/Checkout"

const co = new Checkout()
const ShoppingCart = () => {
	
	return (
		<>
			<ProductList products={products} />
			<OrderSummary />
		</>
	)
}

export default ShoppingCart
