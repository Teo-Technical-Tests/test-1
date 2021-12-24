import React from "react"
import Discounts from "./Discounts"
import Summary from "./Summary"

const OrderSummary = () => {
	return (
		<aside className='summary'>
			<h1 className='main'>Order Summary</h1>
			<ul className='summary-items wrapper border'>
				<Summary />
			</ul>

			<div className='summary-discounts wrapper-half border'>
				<h2>Discounts</h2>
				<Discounts />
			</div>
			<div className='summary-total wrapper'>
				<ul>
					<li>
						<span className='summary-total-cost'>Total cost</span>
						<span className='summary-total-price'>107€</span>
					</li>
				</ul>
				<button type='submit'>Checkout</button>
			</div>
		</aside>
	)
}

export default OrderSummary
