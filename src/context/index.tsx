import React, { useState, useEffect, createContext } from "react"
import Checkout from "../shared/services/Checkout"
const co = new Checkout()
export const CheckoutContext = createContext({ cart: { products: co.cart, total: 0 }, co })

export const CheckoutProvider = (props: any) => {
	const [cart] = useState({
		products: co.cart,
		total: 0
	})

	return <CheckoutContext.Provider value={{ cart, co }}>{props.children}</CheckoutContext.Provider>
}
export default CheckoutContext
