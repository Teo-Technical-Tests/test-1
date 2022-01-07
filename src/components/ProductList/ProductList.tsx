import { ProductInCart } from "../../types"
import TableBody from "./TableBody"
import TableHead from "./TableHead"

interface Props {
	products: ProductInCart[]
	openModal: () => void
}

const ProductList = ({ products, openModal }: Props) => {
	return (
		<section className='products'>
			<h1 className='main'>Shopping cart</h1>
			<TableHead />
			<TableBody openModal={openModal} products={products} />
		</section>
	)
}

export default ProductList
