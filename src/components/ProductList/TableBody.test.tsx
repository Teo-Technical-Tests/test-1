import { render, screen } from "@testing-library/react"
import { CheckoutProviderWrapper } from "../../context"
import { MemoryRouter } from "react-router"
import Checkout from "../../shared/services/Checkout"
import TableBody from "./TableBody"
import { ProductInCart } from "../../types"

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
				subtotal: 200,
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			},
			{
				id: "2",
				name: "Product 2",
				price: 200,
				image: "https://picsum.photos/200",
				quantity: 3,
				subtotal: 600,
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
			}
		]

		render(
			<MemoryRouter>
				<CheckoutProviderWrapper co={co}>
					<TableBody openModal={() => {}} products={products} />
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
