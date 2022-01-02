import React, { useState, useEffect, createContext } from "react"
import Checkout from "../shared/services/Checkout"
import { ProductInCart, ProductType } from "../shared/types"
const co = new Checkout()

interface CheckoutContext {
	cart: { products: ProductInCart[]; total: number; totalWithoutDiscounts: number }
	scan: (name: string) => void
	unscan: (name: string) => void
	totalItems: number
	getDiscounts: () => { shirts: number; mugs: number }
}

const contextValue: CheckoutContext = {
	cart: { products: co.cart, total: 0, totalWithoutDiscounts: 0 },
	scan: (code: string) => {},
	unscan: (code: string) => {},
	totalItems: 0,
	getDiscounts: () => {
		return { shirts: 0, mugs: 0 }
	}
}

export const CheckoutContext = createContext(contextValue)

export const CheckoutProvider = (props: any) => {
	const [cart, setCart] = useState({
		products: co.cart,
		total: 0,
		totalWithoutDiscounts: 0
	})

	const scanHandler = (code: string) => {
		co.scan(code)
		setCart({ products: co.cart, total: co.total(), totalWithoutDiscounts: co.totalWithoutDiscounts() })
	}

	const unscanHandler = (code: string) => {
		co.unscan(code)
		setCart({ products: co.cart, total: co.total(), totalWithoutDiscounts: co.totalWithoutDiscounts() })
	}

	return (
		<CheckoutContext.Provider
			value={{
				cart,
				scan: scanHandler,
				unscan: unscanHandler,
				totalItems: co.totalItems,
				getDiscounts: () => co.getDiscounts()
			}}
		>
			{props.children}
		</CheckoutContext.Provider>
	)
}
export default CheckoutContext
