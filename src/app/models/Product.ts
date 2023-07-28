import { Byte } from './types';

export interface Product {
    id: Number;
    name: string;
    description: string;
    price: Number;
    addedOn: Date;
    image: [Byte];
    imageUrl: string;
}

