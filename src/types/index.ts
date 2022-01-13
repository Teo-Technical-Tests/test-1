export type ProductType = {
	id: string
	price: number
	image: string
	name: string
	description: string
}

export interface ProductInCart extends ProductType {
	quantity: number
	subtotal: number
	discount?: {
		type: string
		value?: number
		minQuantity?: number
	}
}

export type CheckoutInitialState = {
	productsInCart: ProductInCart[]
	total: number
}

export interface ICheckoutContext {
	cart: { products: ProductInCart[]; total: number; totalWithoutDiscounts: number }
	scan: (name: string) => void
	unscan: (name: string) => void
	getTotalItems: () => number
	getDiscounts: () => { shirts: number; mugs: number }
	emptyProduct: (code: string) => void
}
