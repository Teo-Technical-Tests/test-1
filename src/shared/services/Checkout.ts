import { ProductType, ProductInCart } from "../../types"
import { getProduct } from "../constants/fakeapi"
import { productCodes } from "../constants"
import { fakeFetchUserCart } from "./FakeFetchUserCart"
import { toFixedFloat } from "../helpers"

//Comment: more of a helper class than a service
class Checkout {
	cart: ProductInCart[] = fakeFetchUserCart()

	//utils
	private addToCart(product: ProductType) {
		const productFound = this.getItemFromCart(product.name.toUpperCase())
		if (productFound) {
			productFound.quantity++
		} else {
			this.cart.push({ ...product, quantity: 1, subtotal: product.price })
		}
	}

	private getItemFromCart(code: string): ProductInCart | null {
		return this.cart.find(p => p.id === productCodes[code]) || null
	}

	private hasDiscount(product: ProductInCart): boolean {
		const { discount, quantity } = product

		if (!discount) return false
		else {
			switch (product.discount?.type) {
				case "percentage":
				case "2x1":
					return discount.minQuantity ? product.quantity >= discount?.minQuantity : false
				default:
					return false
			}
		}
	}

	private calcDiscount = (product: ProductInCart) => {
		const { price, quantity } = product
		if (!product.discount) return price * quantity

		const { type = "none", value = 0 } = product.discount

		switch (type) {
			case "2x1":
				const unpaired = quantity % 2 ? 1 : 0
				const paires = (quantity - unpaired) / 2
				return toFixedFloat(paires * price + unpaired * price, 2)
			case "percentage":
				return toFixedFloat((price * quantity * (100 - value)) / 100, 2)
			default:
				return price
		}
	}

	private applyDiscounts(): void {
		this.cart.forEach(product => {
			if (this.hasDiscount(product)) {
				product.subtotal = this.calcDiscount(product)
			} else {
				product.subtotal = product.price * product.quantity
			}
		})
	}

	private calcTotalWithDiscounts(): number {
		this.applyDiscounts()
		return this.cart.reduce((acc, product) => acc + product.subtotal, 0)
	}

	public scan(code: string): this {
		const product = getProduct(code.toUpperCase())
		//TODO manage null return
		if (product === null) {
			console.error(`Product ${code} not found`)
			return this
		}

		this.addToCart(product)
		return this
	}

	public unscan(code: string) {
		const productFound = this.getItemFromCart(code.toUpperCase())

		if (productFound) {
			if (productFound?.quantity <= 0) return this

			productFound.quantity--
			productFound.subtotal = toFixedFloat(productFound.price * productFound.quantity, 2)
		}

		return this
	}

	public getDiscounts(): { shirts: number; mugs: number } {
		const shirts = this.getItemFromCart("TSHIRT")
		const mugs = this.getItemFromCart("MUG")

		const shirtDiscount = shirts?.discount ? shirts.price * shirts?.quantity * 0.05 : 0
		const mugDiscount = mugs?.discount ? mugs.price * Math.floor(mugs.quantity / 2) : 0
		return {
			shirts: shirtDiscount,
			mugs: mugDiscount
		}
	}

	public getTotalItems(): number {
		return this.cart.reduce((acc, product) => acc + product.quantity, 0)
	}

	public calcTotalWithoutDiscounts(): number {
		return this.cart.reduce((acc, product) => acc + product.price * product.quantity, 0)
	}

	public total(): number {
		return this.getTotalItems() > 0 ? this.calcTotalWithDiscounts() : 0
	}
}

export default Checkout
