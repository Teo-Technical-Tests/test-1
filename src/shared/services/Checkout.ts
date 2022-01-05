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
	private hasShirtDiscount(): boolean {
		const shirts = this.getItemFromCart("TSHIRT")
		if (!shirts) return false
		else return shirts.quantity >= 3
	}

	private hasMugDiscount(): boolean {
		const mugs = this.getItemFromCart("MUG")
		if (!mugs) return false
		else return mugs.quantity > 1
	}

	private applyShirtDiscount(): void {
		const shirts = this.getItemFromCart("TSHIRT")

		if (shirts && this.hasShirtDiscount()) {
			shirts.subtotal = toFixedFloat(shirts.price * 0.95 * shirts.quantity, 2)
		} else if (shirts) {
			shirts.subtotal = toFixedFloat(shirts.price * shirts.quantity, 2)
		}
	}

	private applyMugDiscount(): void {
		const mugs = this.getItemFromCart("MUG")

		if (mugs && this.hasMugDiscount()) {
			const discountQuantity = Math.floor(mugs.quantity / 2)
			mugs.subtotal = toFixedFloat(mugs.price * mugs.quantity - mugs.price * discountQuantity, 2)
		} else if (mugs) {
			mugs.subtotal = toFixedFloat(mugs.price * mugs.quantity, 2)
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

		const shirtDiscount = shirts && this.hasShirtDiscount() ? shirts.price * shirts?.quantity * 0.05 : 0
		const mugDiscount = mugs && this.hasMugDiscount() ? mugs.price * Math.floor(mugs.quantity / 2) : 0
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
		return this.calcTotalWithDiscounts()
	}
}

export default Checkout
