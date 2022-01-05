import { ProductType, ProductInCart } from "../types"
import { getProduct } from "../constants/fakeapi"
import { productCodes } from "../constants"
import { fakeFetchUserCart } from "./FakeFetchUserCart"
import { toFixedFloat } from "../helpers"

class Checkout {
	cart: ProductInCart[] = fakeFetchUserCart()

	//utils
	private addToCart(product: ProductType) {
		const productFound = this.getItemFromCart(product.name.toUpperCase())
		if (productFound) {
			productFound.quantity++
			productFound.subtotal = toFixedFloat(productFound.price * productFound.quantity, 2)
		} else {
			this.cart.push({ ...product, quantity: 1, subtotal: product.price })
		}
	}

	private getItemFromCart(code: string): ProductInCart | null {
		return this.cart.find(p => p.id === productCodes[code]) || null
	}

	//TODO scale for Type of discount instead of item
	//Discounts:
	private hasDiscount(product: ProductInCart): boolean {
		return !!product.discount
	}

	private applyDiscount = (type: string = "none", price: number, quantity: number, percentage: number = 0) => {
		switch (type) {
			case "2x1":
				const unpaired = (quantity %= 2)
				return toFixedFloat((price * quantity) / 2 + price * unpaired, 2)
			case "percentage":
				return toFixedFloat(price * (100 - percentage / 100), 2)
			case "none":
			default:
				return price
		}
	}

	private applyDiscounts(): void {
		this.cart.forEach(product => {
			if (this.hasDiscount(product)) {
				product.subtotal = this.applyDiscount(
					product.discount?.type,
					product.price,
					product.quantity,
					product.discount?.value
				)
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
