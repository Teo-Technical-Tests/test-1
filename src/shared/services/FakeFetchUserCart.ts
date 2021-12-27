import products from "../constants/fakeapi"

export const fakeFetchUserCart = () =>
	products.map(product => {
		return { ...product, quantity: 0, subtotal: 0 }
	})
