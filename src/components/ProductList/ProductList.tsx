import { ProductType } from "../../shared/types"
import TableBody from "./TableBody"
import TableHead from "./TableHead"

interface Props {
	products: ProductType[]
}

const ProductList = ({ products }: Props) => {
	return (
		<section className='products'>
			<h1 className='main'>Shopping cart</h1>
			<TableHead />
			<TableBody products={products} />
		</section>
	)
}

export default ProductList
