import products from "../../shared/constants/fakeapi"
import TableBody from "./TableBody"
import TableHead from "./TableHead"

const ProductList = () => {
	return (
		<section className='products'>
			<h1 className='main'>Shopping cart</h1>
			<TableHead />
			<TableBody products={products} />
		</section>
	)
}

export default ProductList
