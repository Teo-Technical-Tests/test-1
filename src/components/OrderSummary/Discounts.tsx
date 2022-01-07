import { useContext } from "react"
import CheckoutContext from "../../context"

const Discounts = () => {
	const { getDiscounts } = useContext(CheckoutContext)

	return (
		<ul>
			<li>
				<span>2x1 Mug offer</span>
				<span>{getDiscounts().mugs ? "-" + getDiscounts().mugs : "0"}€</span>
			</li>
			<li>
				<span>x3 Shirt offer</span>

				<span>{getDiscounts().shirts ? "-" + getDiscounts().shirts : "0"}€</span>
			</li>
			<li>
				<span>Promo code</span>
				<span>0€</span>
			</li>
		</ul>
	)
}

export default Discounts
