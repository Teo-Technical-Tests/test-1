interface Props {
	getTotalItems: () => number
	totalWithoutDiscounts: number
}

const Summary = ({ getTotalItems, totalWithoutDiscounts }: Props) => {
	const number = getTotalItems()
	return (
		<li>
			<span className='summary-items-number'>{number} Items</span>
			<span className='summary-items-price'>
				{totalWithoutDiscounts}
				<span className='currency'>€</span>
			</span>
		</li>
	)
}

export default Summary
