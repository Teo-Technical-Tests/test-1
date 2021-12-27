import { ProductType, ProductInCart } from "../types"
import { getProduct } from "../constants/fakeapi"
import { productCodes } from "../constants"
import { fakeFetchUserCart } from "./FakeFetchUserCart"

class Checkout {
	cart: ProductInCart[] = fakeFetchUserCart()

	//utils
	private addToCart(product: ProductType) {
		const productFound = this.getItemFromCart(product.name.toUpperCase())
		if (productFound) {
			productFound.quantity++
			productFound.subtotal = productFound.price * productFound.quantity
		} else {
			this.cart.push({ ...product, quantity: 1, subtotal: product.price })
		}
	}
	public removeFromCart(code: string) {
		const productFound = this.getItemFromCart(code)

		if (productFound) {
			productFound.quantity--
			productFound.subtotal = productFound.price * productFound.quantity
		} else {
			this.cart = this.cart.filter(p => p.id !== code)
		}
	}
	private getItemFromCart(code: string): ProductInCart | null {
		return this.cart.find(p => p.id === productCodes[code]) || null
	}

	//TODO scale for Type of discount instead of item
	//Discounts:
	private hasShirtDiscount(): boolean {
		const shirts = this.getItemFromCart("TSHIRT")
		if (!shirts) return false
		else return shirts.quantity >= 3
	}
	private hasMugDiscount(): boolean {
		const mugs = this.getItemFromCart("MUG")
		if (!mugs) return false
		else return mugs.quantity % 2 === 0
	}

	private applyShirtDiscount(): void {
		const shirts = this.getItemFromCart("TSHIRT")

		if (shirts && this.hasShirtDiscount()) {
			shirts.subtotal *= 0.95
		} else if (shirts) {
			shirts.subtotal = shirts.price * shirts.quantity
		}
	}

	private applyMugDiscount(): void {
		const mugs = this.getItemFromCart("MUG")

		if (mugs && this.hasMugDiscount()) {
			const discountQuantity = Math.floor(mugs.quantity / 2)
			mugs.subtotal = mugs.price * (mugs.quantity - discountQuantity)
		} else if (mugs) {
			mugs.subtotal = mugs.price * mugs.quantity
		}
	}

	private applyDiscounts(): void {
		this.applyMugDiscount()
		this.applyShirtDiscount()
	}

	private calcTotalWithDiscounts(): number {
		this.applyDiscounts()
		return this.cart.reduce((acc, product) => acc + product.subtotal, 0)
	}

	public scan(code: string): this {
		const product = getProduct(code.toUpperCase())
		console.log(this)
		//TODO manage null return
		if (product === null) {
			console.error(`Product ${code} not found`)
			return this
		}

		this.addToCart(product)
		return this
	}

	public total(): number {
		return this.calcTotalWithDiscounts()
	}
}

export default Checkout
