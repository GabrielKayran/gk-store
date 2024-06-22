import { Component } from '@angular/core';
import {StateCartService} from "../../services/state-cart.service";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [
    MatButton,
    NgOptimizedImage
  ],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss'
})
export class PurchaseComponent {
  constructor(private stateCart: StateCartService, private router: Router) {}

  get cartProducts() {
    return this.stateCart.cartProducts();
  }

  get productsCount() {
    return this.stateCart.productsCount();
  }

  returnToHome(){
    this.stateCart.clearCart();
    this.router.navigate(['/']);
  }
}
