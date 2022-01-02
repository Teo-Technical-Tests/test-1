import React from "react"

interface Props {
	totalItems: number
	totalWithoutDiscounts: number
}

const Summary = ({ totalItems, totalWithoutDiscounts }: Props) => {
	return (
		<li>
			<span className='summary-items-number'>{totalItems} Items</span>
			<span className='summary-items-price'>
				{totalWithoutDiscounts}
				<span className='currency'>€</span>
			</span>
		</li>
	)
}

export default Summary
