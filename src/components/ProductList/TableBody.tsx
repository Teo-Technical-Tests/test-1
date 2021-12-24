import Product from "./Product"
import { ProductType } from "../../shared/types"

interface Props {
	products: ProductType[]
}

const displayProducts = (products: ProductType[]): JSX.Element[] =>
	products.map((product: ProductType) => <Product key={product.id} {...product} />)

const TableBody = ({ products }: Props) => {
	return <ul className='products-list'>{displayProducts(products)}</ul>
}

export default TableBody
