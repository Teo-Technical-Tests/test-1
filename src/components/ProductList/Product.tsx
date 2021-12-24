import { getImage } from "../../shared/helpers"
import useQuantityInput from "../../shared/hooks/useQuantityInput"

interface Props {
	name: string
	price: number
	image: string
	id: string
}

const Product = ({ name, price, image, id }: Props) => {
	const [quantity, increaseQuantity, decreaseQuantity] = useQuantityInput()

	return (
		<li className='product row'>
			<div className='col-product'>
				<figure className='product-image'>
					<img src={getImage(image)} alt='Shirt' />
					<div className='product-description'>
						<h1>{name}</h1>
						<p className='product-code'>Product code {id}</p>
					</div>
				</figure>
			</div>
			<div className='col-quantity'>
				<button className='count' onClick={decreaseQuantity}>
					-
				</button>
				<input type='text' className='product-quantity' value={quantity} />
				<button className='count' onClick={increaseQuantity}>
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
