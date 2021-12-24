import { ProductType } from "../types"
const products = [
	{
		id: "X7R2OPX",
		price: 20,
		name: "Shirt",
		image: "shirt.png"
	},
	{
		id: "X2G2OPZ",
		price: 5,
		name: "Mug",
		image: "mug.png"
	},
	{
		id: "X3W2OPY",
		price: 10,
		name: "Cap",
		image: "cap.png"
	}
]

export default products

export const getProduct = (code: string): ProductType | null => products.find(p => p.id === code) || null
