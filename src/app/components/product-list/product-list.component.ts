import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
priceString(_t12: Product): string|number {
throw new Error('Method not implemented.');
}
    public term : string| undefined;
    public products: Product[] =[];

    constructor(router : Router, route : ActivatedRoute, private productsService : ProductsService) { 
        this.term = route.snapshot.paramMap.get('term') || ""
    }

    ngOnInit(): void {
        this.productsService.getProducts().subscribe(
          (products: Product[]) => {
            this.products = products.map(product => ({
              ...product,
              imageUrl: product.image || "../../../assets/static/images/question_mark.png"
            }));
          },
          (error: ErrorEvent) => {
            console.error("Error fetching products:", error);
          }
        );

    // ngOnInit(): void {
    //     this.productsService.getProducts().subscribe((products : Product[]) => {
    //         this.products = products

    //         for (let product of this.products) {
    //             product.imageUrl = product.image || "../../../assets/static/images/question_mark.png";
                
    //         }
    //     }, (error: ErrorEvent) => {
    //     })
    // }
}
}
