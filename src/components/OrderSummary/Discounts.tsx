import React from "react"

interface Props {}

const Discounts = (props: Props) => {
	return (
		<ul>
			<li>
				<span>2x1 Mug offer</span>
				<span>-10€</span>
			</li>
			<li>
				<span>x3 Shirt offer</span>
				<span>-3€</span>
			</li>
			<li>
				<span>Promo code</span>
				<span>0€</span>
			</li>
		</ul>
	)
}

export default Discounts
