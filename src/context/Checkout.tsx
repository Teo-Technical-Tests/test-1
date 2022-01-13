import { useState, useEffect, createContext } from "react"
import Checkout from "../services/Checkout"
import { ProductInCart } from "../types"
import { ICheckoutContext } from "../types"

const contextValue: ICheckoutContext = {
	cart: { products: [], total: 0, totalWithoutDiscounts: 0 },
	scan: (code: string) => {},
	unscan: (code: string) => {},
	getTotalItems: () => 0,
	getDiscounts: () => {
		return { shirts: 0, mugs: 0 }
	},
	emptyProduct: (code: string) => {}
}

export const CheckoutContext = createContext(contextValue)

export const CheckoutProviderWrapper = ({ co = new Checkout(), children }: any) => {
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

	const emptyProductHandler = (code: string) => {
		co.emptyProduct(code)
		refreshCart()
	}

	const contextValue = {
		cart,
		scan: scanHandler,
		unscan: unscanHandler,
		getTotalItems: () => co.getTotalItems(),
		getDiscounts: () => co.getDiscounts(),
		emptyProduct: emptyProductHandler
	}

	return <CheckoutContext.Provider value={contextValue}>{children}</CheckoutContext.Provider>
}
export default CheckoutContext
