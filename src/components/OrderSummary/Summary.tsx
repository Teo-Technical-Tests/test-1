import { useContext } from "react"
import CheckoutContext from "../../context/Checkout"

const Summary = () => {
	const { cart, getTotalItems } = useContext(CheckoutContext)
	return (
		<li>
			<span className='summary-items-number'>{getTotalItems()} Items</span>
			<span className='summary-items-price'>
				{cart.totalWithoutDiscounts}
				<span className='currency'>€</span>
			</span>
		</li>
	)
}

export default Summary
