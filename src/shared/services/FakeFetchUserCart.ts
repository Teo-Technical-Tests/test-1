import products from "../constants/fakeapi"

export const fakeFetchUserCart = () =>
	products.map(product => {
		return { ...product, discount: product.discount, quantity: 0, subtotal: 0 }
	})
