import Product from "./Product"
import { ProductInCart, ProductType } from "../../shared/types"
import { useForceUpdate } from "../../hooks/useForceUpdate"
interface Props {
	products: ProductInCart[]
}

const displayProducts = (products: ProductInCart[]): JSX.Element[] => {
	return products.map((product: ProductInCart) => {
		return <Product key={product.id} product={product} />
	})
}

const TableBody = ({ products }: Props) => {
	return <ul className='products-list'>{displayProducts(products)}</ul>
}

export default TableBody
