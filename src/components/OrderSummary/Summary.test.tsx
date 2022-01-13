import { render, RenderResult, screen } from "@testing-library/react"
import Summary from "./Summary"
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
	describe("shows calcTotalWithoutDiscounts items correctly when ", () => {
		let co: Checkout
		let renderWithCheckout: () => void
		beforeEach(() => {
			co = new Checkout()

			renderWithCheckout = () =>
				render(
					<MemoryRouter>
						<CheckoutProviderWrapper co={co}>
							<Summary />
						</CheckoutProviderWrapper>
					</MemoryRouter>
				)
		})

		test("no products in cart", () => {
			renderWithCheckout()
			screen.getByText(/0 Items/i)
		})

		test("shirt added to cart", () => {
			co.scan("TSHIRT")
			renderWithCheckout()
			screen.getByText(/1 Items/i)
		})

		test("mug added to cart", () => {
			co.scan("MUG")
			renderWithCheckout()
			screen.getByText(/1 Items/i)
		})

		test("cap added to cart", () => {
			co.scan("CAP")
			renderWithCheckout()
			screen.getByText(/1 Items/i)
		})

		test("added many of the same type", () => {
			const random = Math.floor(Math.random() * 100)
			for (let i = 0; i < random; i++) {
				co.scan("TSHIRT")
			}

			renderWithCheckout()
			screen.getByText(`${random} Items`)
		})

		test("added many of different types", () => {
			const random = Math.floor(Math.random() * 100)

			for (let i = 0; i < random; i++) {
				co.scan(pickRandomProduct())
			}

			renderWithCheckout()
			screen.getByText(`${random} Items`)
		})

		test("added many of different types and then removed one of each", () => {
			const random = Math.floor(Math.random() * 100)

			co.scan("TSHIRT").scan("MUG").scan("CAP")

			for (let i = 0; i < random - 3; i++) {
				co.scan(pickRandomProduct())
			}

			co.unscan("TSHIRT").unscan("MUG").unscan("CAP")

			renderWithCheckout()
			screen.getByText(`${random - 3} Items`)
		})
	})

	describe("shows calcTotalWithoutDiscounts cost correctly when ", () => {
		let co: Checkout
		let renderWithCheckout: () => void
		let component: RenderResult
		beforeEach(() => {
			co = new Checkout()

			renderWithCheckout = () =>
				(component = render(
					<MemoryRouter>
						<CheckoutProviderWrapper co={co}>
							<Summary />
						</CheckoutProviderWrapper>
					</MemoryRouter>
				))
		})

		test("no products in cart", () => {
			renderWithCheckout()
			component.getByText(co.calcTotalWithoutDiscounts())
		})

		test("shirt added to cart", () => {
			co.scan("TSHIRT")
			renderWithCheckout()
			component.getByText(co.calcTotalWithoutDiscounts())
		})

		test("mug added to cart", () => {
			co.scan("MUG")
			renderWithCheckout()
			component.getByText(co.calcTotalWithoutDiscounts())
		})

		test("cap added to cart", () => {
			co.scan("CAP")
			renderWithCheckout()
			component.getByText(co.calcTotalWithoutDiscounts())
		})

		test("shirts are discounted", () => {
			co.scan("TSHIRT").scan("TSHIRT").scan("TSHIRT")
			renderWithCheckout()
			component.getByText(co.calcTotalWithoutDiscounts())
		})

		test("mugs are discounted", () => {
			co.scan("MUG").scan("MUG")
			renderWithCheckout()
			component.getByText(co.calcTotalWithoutDiscounts())
		})

		test("added many of the same type", () => {
			const random = Math.floor(Math.random() * 100)
			for (let i = 0; i < random; i++) {
				co.scan("TSHIRT")
			}
			renderWithCheckout()
			component.getByText(co.calcTotalWithoutDiscounts())
		})

		test("added many of different types", () => {
			const random = Math.floor(Math.random() * 100)
			for (let i = 0; i < random; i++) {
				co.scan(pickRandomProduct())
			}
			renderWithCheckout()
			component.getByText(co.calcTotalWithoutDiscounts())
		})

		test("added many of different types and then removed one of each", () => {
			const random = Math.floor(Math.random() * 100)

			for (let i = 0; i < random; i++) {
				co.scan(pickRandomProduct())
			}

			co.unscan("TSHIRT").unscan("MUG").unscan("CAP")

			renderWithCheckout()
			component.getByText(co.calcTotalWithoutDiscounts())
		})
	})
})
