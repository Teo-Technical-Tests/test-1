//TODO reuse this hook
import { useState } from "react"

const useQuantityInput = (min: number, max?: number): [number, (value: number) => void] => {
	const [quantity, setQuantity] = useState(0)

	const changeQuantityBy = (value: number): void => {
		if (quantity + value < min) return
		if (max && quantity + value > max) return
		setQuantity(prevQuantity => prevQuantity + value)
	}

	return [quantity, changeQuantityBy]
}
export default useQuantityInput
