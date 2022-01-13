import { render, screen, fireEvent, RenderResult } from "@testing-library/react"
import { CheckoutProviderWrapper } from "../../context/Checkout"
import { MemoryRouter } from "react-router"
import Checkout from "../../services/Checkout"
import Product from "./Product"

describe("Each product row  ", () => {
	let co: Checkout
	type Product = {
		id: string
		name: string
		price: number
		image: string
		description: string
		quantity: number
		subtotal: number
	}

	let product: Product, component: any

	beforeEach(() => {
		co = new Checkout()

		product = {
			id: "1",
			name: "Product 1",
			price: 100,
			image: "https://picsum.photos/200",
			description: "Description 1",
			quantity: 2,
			subtotal: 100
		}

		render(
			<MemoryRouter>
				<CheckoutProviderWrapper co={co}>
					<Product openModal={() => {}} product={product} />
				</CheckoutProviderWrapper>
			</MemoryRouter>
		)
	})

	test("shows the product name", () => {
		expect(screen.getByText(product.name)).toBeInTheDocument()
	})

	test("shows the product price", () => {
		expect(screen.getByText(`${product.price}`)).toBeInTheDocument()
	})

	test("shows the product image", () => {
		expect(screen.getByAltText(product.name)).toBeInTheDocument()
	})

	test("shows the product code", () => {
		expect(screen.getByText(`Product code ${product.id}`)).toBeInTheDocument()
	})

	test("shows the quantity input", () => {
		expect(screen.getByDisplayValue(product.quantity)).toBeInTheDocument()
	})

	test("shows the total price", () => {
		expect(screen.getByText(`${product.price * product.quantity}`)).toBeInTheDocument()
	})
})
