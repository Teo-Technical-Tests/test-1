import { ProductType } from "../../shared/types"
import { getImage } from "../../shared/helpers"
import useQuantityInput from "../../hooks/useQuantityInput"

const Product = ({ name, price, image, id }: ProductType) => {
	const [quantity, changeQuantityBy] = useQuantityInput(0)

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
				<button className='count' onClick={() => changeQuantityBy(-1)}>
					-
				</button>
				<input
					min='0'
					type='text'
					className='product-quantity'
					onChange={e => changeQuantityBy(parseInt(e.currentTarget.value))}
					value={quantity}
				/>
				<button className='count' onClick={() => changeQuantityBy(1)}>
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
