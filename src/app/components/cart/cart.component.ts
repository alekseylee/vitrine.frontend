import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from 'src/app/models/CartItem';
import { Product } from 'src/app/models/Product';
import { User } from 'src/app/models/User';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    [x: string]: any;
    caretUp = faCaretUp;
    caretDown = faCaretDown;

    user : User | any
    cartItems: CartItem[] = [];
    searchQuery: string = '';
    filteredItems: any[] = [];

    constructor(
        private router : Router, 
        private usersService : UsersService,
        private cartItemsService : CartItemsService
    ) {
        this.filteredItems = this.cartItems;
     }

    ngOnInit(): void {
        if (!localStorage.getItem('token')) {
            this.router.navigateByUrl('/login')
            return
        }

        this.usersService.getUserByToken().subscribe((user : User) => {
            this.user = user;
            this.getItems()
        }, (error : ErrorEvent) => {
            console.log(error)
        })
    }

    getItems () {
        this.cartItemsService.getUserCart(this.user.id.toString()).subscribe((cartItems : CartItem[]) => {
            this.cartItems = cartItems;
        })
    }

    getTotal () : Number {
        var reducer = (acc: any, val: any) => acc + val;
        return this.cartItems ? this.cartItems.map((item) => item.totalPrice).reduce(reducer) : 0.0
    }

    increaseQuantity (item : CartItem) {
        this.cartItemsService.updateUserCartItem(
            this.user.id.toString(), item.product.id.toString(), item.quantity + 1).subscribe(res => {
            console.log(res)
            this.getItems()
        })
    }

    decreaseQuantity (item : CartItem) {
        if (item.quantity - 1 <= 0) {
            this.cartItemsService.deleteUserCartItem(this.user.id.toString(), item.product.id.toString()).subscribe(res => {
                console.log(res)
                this.getItems()
            })
        } else {
            this.cartItemsService.updateUserCartItem(
                this.user.id.toString(), item.product.id.toString(), item.quantity - 1).subscribe(res => {
                console.log(res)
                this.getItems()
            })
        }
    }

    onSearch() {
        if (this.searchQuery) {
          // Use the Array filter method to filter items
          this.filteredItems = this.cartItems.filter(item => {
            // Replace 'item.name' with the property you want to search in
            return Product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          });
        } else {
          // If the search query is empty, show all items
          this.filteredItems = this.cartItems;
        }
}
}
