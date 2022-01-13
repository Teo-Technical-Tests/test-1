import { render, RenderResult, screen } from "@testing-library/react"
import OrderSummary from "./OrderSummary"
import { CheckoutProviderWrapper } from "../../context/Checkout"
import { MemoryRouter } from "react-router"
import Checkout from "../../services/Checkout"

//TESTING UTILS
let pickRandomProduct = () => {
	const randomNumber = Math.random()
	if (randomNumber < 0.33) {
		return "TSHIRT"
	} else if (randomNumber < 0.66) {
		return "MUG"
	} else {
		return "CAP"
	}
}

describe("UNIT TESTING", () => {
	test("renders OrderSummary", () => {
		render(<OrderSummary />)
		const numberOfItems = screen.getByText(/Order Summary/i)
		expect(numberOfItems).toBeInTheDocument()
	})

	describe("shows total cost correctly when ", () => {
		let co: Checkout
		let renderWithCheckout: () => void
		beforeEach(() => {
			co = new Checkout()

			renderWithCheckout = () =>
				render(
					<MemoryRouter>
						<CheckoutProviderWrapper co={co}>
							<OrderSummary />
						</CheckoutProviderWrapper>
					</MemoryRouter>
				)
		})

		test("no products in cart", () => {
			renderWithCheckout()
			const component = screen.getByText(/Total Cost/i).nextSibling
			expect(component?.textContent).toBe("0€")
		})

		test("shirt added to cart", () => {
			co.scan("TSHIRT")
			renderWithCheckout()
			const component = screen.getByText(/Total Cost/i).nextSibling
			expect(component?.textContent).toBe(`${co.total()}€`)
		})

		test("mug added to cart", () => {
			co.scan("MUG")
			renderWithCheckout()
			const component = screen.getByText(/Total Cost/i).nextSibling
			expect(component?.textContent).toBe(`${co.total()}€`)
		})

		test("cap added to cart", () => {
			co.scan("CAP")
			renderWithCheckout()
			const component = screen.getByText(/Total Cost/i).nextSibling
			expect(component?.textContent).toBe(`${co.total()}€`)
		})

		test("shirts are discounted", () => {
			co.scan("TSHIRT").scan("TSHIRT").scan("TSHIRT")
			renderWithCheckout()
			const component = screen.getByText(/Total Cost/i).nextSibling
			expect(component?.textContent).toBe(`${co.total()}€`)
		})

		test("mugs are discounted", () => {
			co = new Checkout()
			co.scan("MUG").scan("MUG")
			renderWithCheckout()
			const component = screen.getByText(/Total Cost/i).nextSibling
			expect(component?.textContent).toBe(`${co.total()}€`)
		})

		test("added many of the same type", () => {
			const random = Math.floor(Math.random() * 100)
			for (let i = 0; i < random; i++) {
				co.scan("TSHIRT")
			}
			renderWithCheckout()
			const component = screen.getByText(/Total Cost/i).nextSibling
			expect(component?.textContent).toBe(`${co.total()}€`)
		})

		test("added many of different types", () => {
			const random = Math.floor(Math.random() * 100)
			for (let i = 0; i < random; i++) {
				co.scan(pickRandomProduct())
			}
			renderWithCheckout()
			const component = screen.getByText(/Total Cost/i).nextSibling
			expect(component?.textContent).toBe(`${co.total()}€`)
		})

		test("added many of different types and then removed one of each", () => {
			const random = Math.floor(Math.random() * 100)

			for (let i = 0; i < random; i++) {
				co.scan(pickRandomProduct())
			}

			co.unscan("TSHIRT").unscan("MUG").unscan("CAP")

			renderWithCheckout()
			const component = screen.getByText(/Total Cost/i).nextSibling
			expect(component?.textContent).toBe(`${co.total()}€`)
		})
	})
})
