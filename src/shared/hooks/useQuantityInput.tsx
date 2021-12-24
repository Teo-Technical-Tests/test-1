import { useState } from "react"

const useQuantityInput = (): [number, () => void, () => void] => {
	const [quantity, setQuantity] = useState(0)

	const increaseQuantity = (): void => setQuantity(prevQuantity => prevQuantity + 1)
	const decreaseQuantity = (): void => setQuantity(prevQuantity => prevQuantity - 1)

	return [quantity, increaseQuantity, decreaseQuantity]
}
export default useQuantityInput
