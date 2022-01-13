import { render, screen } from "@testing-library/react"
import Discounts from "./Discounts"
import { CheckoutProviderWrapper } from "../../context/Checkout"
import { MemoryRouter } from "react-router"
import Checkout from "../../services/Checkout"

describe("shows discounts correctly when ", () => {
	let co: Checkout
	let renderWithCheckout: () => void
	beforeEach(() => {
		co = new Checkout()

		renderWithCheckout = () =>
			render(
				<MemoryRouter>
					<CheckoutProviderWrapper co={co}>
						<Discounts />
					</CheckoutProviderWrapper>
				</MemoryRouter>
			)
	})

	test("no discounts", () => {
		renderWithCheckout()
		expect(screen.getByText(`2x1 Mug offer`).nextSibling?.textContent).toBe("0€")
		expect(screen.getByText(`x3 Shirt offer`).nextSibling?.textContent).toBe("0€")
	})

	test("2x1 mug discount", () => {
		co.scan("MUG").scan("MUG")
		renderWithCheckout()
		expect(screen.getByText(`2x1 Mug offer`).nextSibling?.textContent).toBe(`-${co.getDiscounts().mugs}€`)
	})

	test("x3 shirt discount", () => {
		co.scan("TSHIRT").scan("TSHIRT").scan("TSHIRT")
		renderWithCheckout()
		expect(screen.getByText(`x3 Shirt offer`).nextSibling?.textContent).toBe(`-${co.getDiscounts().shirts}€`)
	})
})
