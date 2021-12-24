import { ProductType } from "../types"
import { getProduct } from "../constants/fakeapi"

interface ProductInCart extends ProductType {
	quantity: number
	subtotal: number
}

class Checkout {
	cart: ProductInCart[] = []

	//utils
	private addToCart(product: ProductType) {
		const prod = this.getItemFromCart(product.id)

		if (prod) {
			prod.quantity++
			prod.subtotal = prod.price * prod.quantity
		} else {
			this.cart.push({ ...product, quantity: 1, subtotal: product.price })
		}
	}

	private getItemFromCart(code: string): ProductInCart | null {
		return this.cart.find(p => p.id === code) || null
	}

	//TODO scale for Type of discount instead of item
	//Discounts:
	private hasShirtDiscount(): boolean {
		const shirts = this.getItemFromCart("X7R2OPX")
		if (!shirts) return false
		else return shirts.quantity >= 3
	}
	private hasMugDiscount(): boolean {
		const mugs = this.getItemFromCart("X2G2OPZ")
		if (!mugs) return false
		else return mugs.quantity % 2 === 0
	}

	private applyShirtDiscount(): void {
		const shirts = this.getItemFromCart("X7R2OPX")

		if (shirts && this.hasShirtDiscount()) {
			shirts.subtotal *= 0.95
		} else if (shirts) {
			shirts.subtotal = shirts.price * shirts.quantity
		}
	}

	private applyMugDiscount(): void {
		const mugs = this.getItemFromCart("X2G2OPZ")

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
		const product = getProduct(code)

		//TODO manage null return
		if (product === null) {
			console.error(`Product ${code} not found`)
			return this
		}

		this.addToCart(product)
		this.total()
		return this
	}

	public total(): number {
		return this.calcTotalWithDiscounts()
	}
}

export default Checkout
