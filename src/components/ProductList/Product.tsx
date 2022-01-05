import { ProductInCart, ProductType } from "../../shared/types"
import { getImage } from "../../shared/helpers"
import useQuantityInput from "../../hooks/useQuantityInput"
import { useContext } from "react"
import CheckoutContext from "../../context"
import { useForceUpdate } from "../../hooks/useForceUpdate"
import Checkout from "../../shared/services/Checkout"

interface Props {
	product: ProductInCart
}

const Product = ({ product }: Props) => {
	const { scan, unscan } = useContext(CheckoutContext)
	const { name, price, image, id, quantity } = product

	return (
		<li className='product row'>
			<div className='col-product'>
				<figure className='product-image'>
					<img src={getImage(image)} alt={name} />
					<div className='product-description'>
						<h1>{name}</h1>
						<p className='product-code'>Product code {id}</p>
					</div>
				</figure>
			</div>
			<div className='col-quantity'>
				<button title='remove product' className='count' onClick={() => unscan(name)}>
					-
				</button>
				<label htmlFor='quantity'>
					<input
						id='quantity'
						min='0'
						type='text'
						className='product-quantity'
						onChange={e => parseInt(e.currentTarget.value)}
						value={quantity}
					/>
				</label>
				<button title='add product' className='count' onClick={() => scan(name)}>
					+
				</button>
			</div>
			<div className='col-price'>
				<span className='product-price'>{price}</span>
				<span className='product-currency currency'>€</span>
			</div>
			<div className='col-total'>
				<span className='product-price'>{price * quantity}</span>
				<span className='product-currency currency'>€</span>
			</div>
		</li>
	)
}

export default Product
