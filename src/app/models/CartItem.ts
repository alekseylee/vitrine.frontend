import {Product} from "./Product"

export interface CartItem {
    addedOn: Date
    quantity: number
    product: Product
    totalPrice: number
}