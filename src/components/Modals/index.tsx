import { useContext } from "react"
import { CheckoutContext } from "../../context/Checkout"
import { getImage } from "../../shared/helpers"
import { ProductType } from "../../types"
import "./Modal.css"

interface Props {
	product: ProductType
	onClose: () => void
}

export const ProductModal = ({ product, onClose }: Props) => {
	const { image, name, price, id, description } = product
	const { scan } = useContext(CheckoutContext)
	const onSubmit = () => {
		scan(name)
		onClose()
	}

	return (
		<div className='modal-wrapper row'>
			<div className='image'>
				<img src={getImage(image)} alt={name}></img>
			</div>

			<div className='details'>
				<button className='button-close' onClick={onClose}>
					<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							fill-rule='evenodd'
							clip-rule='evenodd'
							d='M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z'
							fill='#8383AD'
						/>
					</svg>
				</button>

				<header className='row main'>
					<h1>{name}</h1>
					<h2>{price}€</h2>
				</header>
				<div className='main'>
					<p>{description}</p>
				</div>
				<footer>
					<p>Product code {id}</p>
					<button type='submit' onClick={onSubmit}>
						Add to cart
					</button>
				</footer>
			</div>
		</div>
	)
}
