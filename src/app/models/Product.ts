export class Product {
    id: Number;
    name: string;
    description: string;
    price: Number;
    addedOn: Date;
    imageUrl: string;
    image: string;
    size: string;

    constructor(id: Number, name: string, description: string, price: Number, addedOn: Date, imageUrl: string, image: string, size: string) {
       this.id = id;
       this.name = name;
       this.description = description;
       this.price = price;
       this.addedOn = addedOn;
       this.imageUrl = imageUrl;
       this.image = image;
       this.size = size;
    }
}