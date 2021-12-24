import { imageURL } from "../constants"

export const getImage = (imgname: string): string => `${imageURL}/${imgname}`
