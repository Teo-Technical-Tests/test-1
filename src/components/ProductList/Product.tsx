import React, { useState, useEffect } from "react"
import { ProductInCart } from "../../types"
import { getImage } from "../../shared/helpers"
import { useContext } from "react"
import CheckoutContext from "../../context/Checkout"

interface Props {
	product: ProductInCart
	openModal: (product: ProductInCart) => void
}

const Product = ({ product, openModal }: Props) => {
	const { scan, unscan, emptyProduct } = useContext(CheckoutContext)
	const [quantity, setQuantity] = useState(product.quantity)
	const { name, price, image, id } = product

	useEffect(() => {
		setQuantity(product.quantity)
	}, [product.quantity])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === "") {
			console.log(quantity, name)
			emptyProduct(name)
		}

		if (parseInt(e.target.value) - quantity > 0) {
			for (let i = 0; i < parseInt(e.target.value) - quantity; i++) {
				scan(name)
			}
		} else if (parseInt(e.target.value) - quantity < 0) {
			for (let i = 0; i < quantity - parseInt(e.target.value); i++) {
				unscan(name)
			}
		}
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
