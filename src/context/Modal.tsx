//Comment: not in use at the moment, attempt to tie the modal to the context
//in order to avoid prop-drilling
import { useState, createContext } from "react"

interface ModalContext {
	handleOpen: () => void
	handleClose: () => void
	isOpen: boolean
}

const contextValue: ModalContext = {
	handleOpen: () => {},
	handleClose: () => {},
	isOpen: false
}

export const ModalContext = createContext(contextValue)

export const ModalContextProvider = ({ product, children }: any) => {
	const [isOpen, setIsOpen] = useState(true)

	const handleOpen = () => {
		console.log(isOpen)
		setIsOpen(true)
	}
	const handleClose = () => setIsOpen(false)

	return isOpen ? (
		<ModalContext.Provider value={{ isOpen, handleOpen, handleClose }}>{children}</ModalContext.Provider>
	) : null
}
