import { productCodes } from "."
import { ProductType } from "../../types"

//MOCK DATA
const products = [
	{
		id: "X7R2OPX",
		price: 20,
		name: "Shirt",
		image: "shirt.png",
		discount: {
			type: "percentage",
			value: 5,
			minQuantity: 3
		},
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		id: "X2G2OPZ",
		price: 5,
		name: "Mug",
		image: "mug.png",
		discount: {
			type: "2x1",
			minQuantity: 2
		},
		description: "lorem ipsum"
	},
	{
		id: "X3W2OPY",
		price: 10,
		name: "Cap",
		image: "cap.png",
		description: "lorem ipsum"
	}
]

export default products

export const getProduct = (code: string): ProductType | null => products.find(p => p.id === productCodes[code]) || null
