import Product from "./Product"
import { ProductInCart } from "../../types"
interface Props {
	products: ProductInCart[]
	openModal: (product: ProductInCart) => void
}

const displayProducts = ({ products, openModal }: Props): JSX.Element[] => {
	return products.map((product: ProductInCart) => {
		return <Product key={product.id} product={product} openModal={openModal} />
	})
}

const TableBody = (props: Props) => {
	return <ul className='products-list'>{displayProducts(props)}</ul>
}

export default TableBody
