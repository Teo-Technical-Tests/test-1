import { render, screen, fireEvent, RenderResult } from "@testing-library/react"
import App from "./App"
import { MemoryRouter } from "react-router"
import Checkout from "./shared/services/Checkout"

//TESTING UTILS

const addProductByRow = (component: any, row: number) => {
	fireEvent.click(component.getAllByText("+")[row])
}

const removeProductByRow = (component: any, row: number) => {
	fireEvent.click(component.getAllByText("-")[row])
}

//INTEGRATION TESTING WITH REAL CHECKOUT PROVIDER
describe("INTEGRATION TEST", () => {
	describe("shows total items correctly when user ", () => {
		let co: Checkout
		let component: RenderResult
		beforeEach(() => {
			co = new Checkout()
			component = render(
				<MemoryRouter>
					<App co={co} />
				</MemoryRouter>
			)
		})
		test("adds any number of products of the same type", () => {
			const totalRows = component.getAllByText("+").length
			const randomNumber = Math.floor(Math.random() * 100)
			const randomRow = Math.floor(Math.random() * totalRows)
			for (let i = 0; i < randomNumber; i++) {
				addProductByRow(component, randomRow)
			}
			screen.getByText(`${randomNumber} Items`)
		})

		test("added multiple products of different types", () => {
			const totalRows = component.getAllByText("+").length
			const randomNumber = Math.floor(Math.random() * 100)

			for (let i = 0; i < randomNumber; i++) {
				const randomRow = Math.floor(Math.random() * totalRows)
				addProductByRow(component, randomRow)
			}
			screen.getByText(`${randomNumber} Items`)
		})

		test("removes one product", () => {
			addProductByRow(component, 0)
			removeProductByRow(component, 0)
			screen.getByText("0 Items")
		})

		test("removes multiple products", () => {
			addProductByRow(component, 0)
			addProductByRow(component, 1)
			removeProductByRow(component, 0)
			removeProductByRow(component, 1)
			screen.getByText("0 Items")
		})
	})

	describe("shows discounts correctly when ", () => {
		let component: RenderResult
		let co
		beforeEach(() => {
			co = new Checkout()
			component = render(
				<MemoryRouter>
					<App co={co} />
				</MemoryRouter>
			)
		})

		test("no discounts", () => {
			expect(component.getByText(`2x1 Mug offer`).nextSibling?.textContent).toBe("0€")
			expect(component.getByText(`x3 Shirt offer`).nextSibling?.textContent).toBe("0€")
		})

		test("2x1 mug discount", () => {
			addProductByRow(component, 1)
			addProductByRow(component, 1)

			expect(screen.getByText(`2x1 Mug offer`).nextSibling?.textContent).toBe("-5€")
		})

		test("x3 shirt discount", () => {
			addProductByRow(component, 0)
			addProductByRow(component, 0)
			addProductByRow(component, 0)

			expect(screen.getByText(`x3 Shirt offer`).nextSibling?.textContent).toBe(`-${20 * 3 * 0.05}€`)
		})
	})

	describe("shows total cost correctly when ", () => {
		let component: RenderResult
		let co: Checkout
		beforeEach(() => {
			co = new Checkout()
			component = render(
				<MemoryRouter>
					<App co={co} />
				</MemoryRouter>
			)
		})

		test("no products in cart", () => {
			const component = screen.getByText(/Total Cost/i).nextSibling
			expect(component?.textContent).toBe("0€")
		})

		test("shirt added to cart", () => {
			addProductByRow(component, 0)
			const totalCostSpan = screen.getByText(/Total Cost/i).nextSibling
			expect(totalCostSpan?.textContent).toBe(`${co.total()}€`)
		})

		test("mug added to cart", () => {
			addProductByRow(component, 1)
			const totalCostSpan = screen.getByText(/Total Cost/i).nextSibling
			expect(totalCostSpan?.textContent).toBe(`${co.total()}€`)
		})

		test("cap added to cart", () => {
			addProductByRow(component, 2)
			const totalCostSpan = screen.getByText(/Total Cost/i).nextSibling
			expect(totalCostSpan?.textContent).toBe(`${co.total()}€`)
		})

		test("shirts are discounted", () => {
			addProductByRow(component, 0)
			addProductByRow(component, 0)
			addProductByRow(component, 0)
			const totalCostSpan = screen.getByText(/Total Cost/i).nextSibling
			expect(totalCostSpan?.textContent).toBe(`${co.total()}€`)
		})

		test("mugs are discounted", () => {
			addProductByRow(component, 1)
			addProductByRow(component, 1)

			const totalCostSpan = screen.getByText(/Total Cost/i).nextSibling
			expect(totalCostSpan?.textContent).toBe(`${co.total()}€`)
		})

		test("added many of the same type", () => {
			const random = Math.floor(Math.random() * 100) + 3

			for (let i = 0; i < random; i++) {
				addProductByRow(component, 0)
			}

			const totalCostSpan = screen.getByText(/Total Cost/i).nextSibling
			expect(totalCostSpan?.textContent).toBe(`${co.total()}€`)
		})

		test("added many of different types", () => {
			const random = Math.floor(Math.random() * 100)

			for (let i = 0; i < random; i++) {
				const randomNumber = Math.random()
				if (randomNumber < 0.33) {
					addProductByRow(component, 0)
				} else if (randomNumber < 0.66) {
					addProductByRow(component, 1)
				} else {
					addProductByRow(component, 2)
				}
			}

			const totalCostSpan = screen.getByText(/Total Cost/i).nextSibling
			expect(totalCostSpan?.textContent).toBe(`${co.total()}€`)
		})

		test("added many of different types and then removed one of each", () => {
			const random = Math.floor(Math.random() * 100)

			for (let i = 0; i < random; i++) {
				const randomNumber = Math.random()
				if (randomNumber < 0.33) {
					addProductByRow(component, 0)
				} else if (randomNumber < 0.66) {
					addProductByRow(component, 1)
				} else {
					addProductByRow(component, 2)
				}
			}

			removeProductByRow(component, 0)
			removeProductByRow(component, 1)
			removeProductByRow(component, 2)

			const totalCostSpan = screen.getByText(/Total Cost/i).nextSibling
			expect(totalCostSpan?.textContent).toBe(`${co.total()}€`)
		})
	})
})
