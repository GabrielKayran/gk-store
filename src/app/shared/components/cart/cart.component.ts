import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {StateCartService} from "../../../services/state-cart.service";
import {Product} from "../../models/product";
import {SmallProductCardComponent} from "../small-product-card/small-product-card.component";
import {CurrencyPipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    SmallProductCardComponent,
    CurrencyPipe,
    MatButton
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(private stateCartService: StateCartService, private router: Router) {
  }



  get cartItems(): Array<Product> {
    return this.stateCartService.cartProducts();
  }
  get productsCount(): number {
    return this.stateCartService.productsCount();
  }

  get total(): number {
    return this.stateCartService.total();
  }
  closeCart() {
    this.stateCartService.cartIsOpen.set(false);
  }

  redirectToPurchase() {
    this.stateCartService.cartIsOpen.set(false);
    this.router.navigate(['/purchase']);
  }

}
