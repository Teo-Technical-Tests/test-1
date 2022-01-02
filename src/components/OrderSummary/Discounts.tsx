import { useContext } from "react"
import CheckoutContext from "../../context"
interface Props {}

const Discounts = (props: Props) => {
	const { getDiscounts } = useContext(CheckoutContext)

	return (
		<ul>
			<li>
				<span>2x1 Mug offer</span>
				<span>-{getDiscounts().mugs}€</span>
			</li>
			<li>
				<span>x3 Shirt offer</span>
				<span>-{getDiscounts().shirts}€</span>
			</li>
			<li>
				<span>Promo code</span>
				<span>0€</span>
			</li>
		</ul>
	)
}

export default Discounts
