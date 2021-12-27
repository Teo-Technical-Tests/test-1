import Product from "./Product"
import { ProductInCart, ProductType } from "../../shared/types"
import { useForceUpdate } from "../../hooks/useForceUpdate"
interface Props {
	products: ProductInCart[]
}

const displayProducts = (products: ProductInCart[], forceUpdate: () => void): JSX.Element[] => {
	return products.map((product: ProductInCart) => {
		return <Product key={product.id} product={product} forceUpdate={forceUpdate} />
	})
}

const TableBody = ({ products }: Props) => {
	//FIXME: remove necesity of forcing an update because of array reference not changing
	const forceUpdate = useForceUpdate()
	return <ul className='products-list'>{displayProducts(products, forceUpdate)}</ul>
}

export default TableBody
