import { render, screen} from "@testing-library/react"
import { CheckoutProviderWrapper } from "../../context"
import { MemoryRouter } from "react-router"
import Checkout from "../../shared/services/Checkout"
import TableBody from "./TableBody"
import { ProductInCart } from "../../shared/types"

describe("TableBody ", () => {
	let co: Checkout

	let products: ProductInCart[]

	beforeEach(() => {
		co = new Checkout()

		products = [
			{
				id: "1",
				name: "Product 1",
				price: 100,
				image: "https://picsum.photos/200",
				quantity: 2,
				subtotal: 200
			},
			{
				id: "2",
				name: "Product 2",
				price: 200,
				image: "https://picsum.photos/200",
				quantity: 3,
				subtotal: 600
			}
		]

		render(
			<MemoryRouter>
				<CheckoutProviderWrapper co={co}>
					<TableBody products={products} />
				</CheckoutProviderWrapper>
			</MemoryRouter>
		)
	})

	test("shows every product name", () => {
		products.forEach(product => {
			expect(screen.getByText(product.name)).toBeInTheDocument()
		})
	})

	test("shows every product price", () => {
		products.forEach((product, idx) => {
			expect(screen.getAllByText(`${product.price}`)[idx]).toBeInTheDocument()
		})
	})

	test("shows every product image", () => {
		products.forEach((product, idx) => {
			expect(screen.getByAltText(product.name)).toBeInTheDocument()
		})
	})

	test("shows every product code", () => {
		products.forEach((product, idx) => {
			expect(screen.getByText(`Product code ${product.id}`)).toBeInTheDocument()
		})
	})

	test("shows the quantity input", () => {
		products.forEach((product, idx) => {
			expect(screen.getByDisplayValue(product.quantity)).toBeInTheDocument()
		})
	})
})
