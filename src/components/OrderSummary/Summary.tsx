import React from "react"

interface Props {}

const Summary = (props: Props) => {
	return (
		<li>
			<span className='summary-items-number'>11 Items</span>
			<span className='summary-items-price'>
				120<span className='currency'>€</span>
			</span>
		</li>
	)
}

export default Summary
