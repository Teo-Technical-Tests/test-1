import React, { useState, useEffect, createContext } from "react"
import Checkout from "../shared/services/Checkout"
import { ProductInCart, ProductType } from "../shared/types"

interface CheckoutContext {
	cart: { products: ProductInCart[]; total: number; totalWithoutDiscounts: number }
	scan: (name: string) => void
	unscan: (name: string) => void
	getTotalItems: () => number
	getDiscounts: () => { shirts: number; mugs: number }
}

const contextValue: CheckoutContext = {
	cart: { products: [], total: 0, totalWithoutDiscounts: 0 },
	scan: (code: string) => {},
	unscan: (code: string) => {},
	getTotalItems: () => 0,
	getDiscounts: () => {
		return { shirts: 0, mugs: 0 }
	}
}

export const CheckoutContext = createContext(contextValue)

export const CheckoutProviderWrapper = ({ co, children }: any) => {
	const [cart, setCart] = useState({
		products: co.cart,
		total: 0,
		totalWithoutDiscounts: 0
	})

	const refreshCart = () =>
		setCart({ products: co.cart, total: co.total(), totalWithoutDiscounts: co.calcTotalWithoutDiscounts() })

	useEffect(() => {
		refreshCart()
		return () => {
			setCart({ products: [], total: 0, totalWithoutDiscounts: 0 })
		}
	}, [co.cart])

	const scanHandler = (code: string) => {
		co.scan(code)
		refreshCart()
	}

	const unscanHandler = (code: string) => {
		co.unscan(code)
		refreshCart()
	}

	return (
		<CheckoutContext.Provider
			value={{
				cart,
				scan: scanHandler,
				unscan: unscanHandler,
				getTotalItems: () => co.getTotalItems(),
				getDiscounts: () => co.getDiscounts()
			}}
		>
			{children}
		</CheckoutContext.Provider>
	)
}
export default CheckoutContext
