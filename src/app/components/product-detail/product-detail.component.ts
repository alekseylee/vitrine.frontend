import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { CartItemsService } from 'src/app/services/cart-items.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    public product! : Product
    public user! : User
    public isProductInCart! : boolean

    constructor(
        private route : ActivatedRoute, 
        private productsService : ProductsService, 
        private usersService : UsersService,
        private cartItemsService : CartItemsService
    ) { }

   
    ngOnInit(): void {
      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        this.productsService.getProduct(productId).subscribe(
          (product: Product) => {
            this.product = product;
            this.product.image = product.image || '../../../assets/static/assets/images/question_mark.jpg';
          },
          (error: ErrorEvent) => {
            console.log(this.product);
          }
        );
      } else {
        console.log('Product ID is null.');
      }
        this.usersService.getUserByToken().subscribe((user : User) => {
            this.user = user
            console.log(this.user.id);
            this.getCartItem()
        }, (error : ErrorEvent) => {
            console.log(error)
        })
    }

    addToCart () {
        this.cartItemsService.addToUserCart(this.user.id.toString(), this.product.id.toString()).subscribe(res => {
            this.getCartItem()
        })
    }

    getCartItem () {
        this.cartItemsService.getCartItem(this.user.id.toString(), this.product.id.toString()).subscribe(res => {
            this.isProductInCart = true
        }, (error : ErrorEvent) => {
            this.isProductInCart = false
        })
    }
}
