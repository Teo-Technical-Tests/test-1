import React, { useState } from "react"
import { ProductInCart } from "../../types"
import { getImage } from "../../shared/helpers"
import { useContext } from "react"
import CheckoutContext from "../../context"

interface Props {
	product: ProductInCart
	openModal: (product: ProductInCart) => void
}

const Product = ({ product, openModal }: Props) => {
	const { scan, unscan, getTotalItems } = useContext(CheckoutContext)
	const [quantity, setQuantity] = useState(product.quantity)
	const { name, price, image, id } = product

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuantity(prevQuantity => {
			console.log(e)

			if (parseInt(e.target.value) - prevQuantity > 0) {
				for (let i = 0; i < parseInt(e.target.value) - prevQuantity; i++) {
					scan(name)
				}
			} else if (parseInt(e.target.value) - prevQuantity < 0) {
				for (let i = 0; i < prevQuantity - parseInt(e.target.value); i++) {
					unscan(name)
				}
			}

			return parseInt(e.target.value || "0")
		})
	}

	return (
		<li className='product row'>
			<div className='col-product'>
				<figure onClick={() => openModal(product)} className='product-image'>
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
						onChange={handleChange}
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
