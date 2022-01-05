import { productCodes } from "."
import { ProductType } from "../types"
const products = [
	{
		id: "X7R2OPX",
		price: 20,
		name: "Shirt",
		image: "shirt.png",
		discount: {
			type: "percentage",
			value: 5
		}
	},
	{
		id: "X2G2OPZ",
		price: 5,
		name: "Mug",
		image: "mug.png",
		discount: {
			type: "2x1"
		}
	},
	{
		id: "X3W2OPY",
		price: 10,
		name: "Cap",
		image: "cap.png"
	}
]

export default products

export const getProduct = (code: string): ProductType | null => products.find(p => p.id === productCodes[code]) || null
