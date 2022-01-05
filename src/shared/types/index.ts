export type ProductType = {
	id: string
	price: number
	image: string
	name: string
}

export interface ProductInCart extends ProductType {
	quantity: number
	subtotal: number
	discount?: {
		type: string
		value?: number
	}
}

export type CheckoutInitialState = {
	productsInCart: ProductInCart[]
	total: number
}
