import { imageURL } from "../constants"

export const getImage = (imgname: string): string => `${imageURL}/${imgname}`
export const toFixedFloat = (value: number, decimals: number): number => parseFloat(value.toFixed(decimals))
