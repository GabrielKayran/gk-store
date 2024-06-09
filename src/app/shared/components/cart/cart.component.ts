import { Component } from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {StateCartService} from "../../../services/state-cart.service";
import {Product} from "../../models/product";
import {SmallProductCardComponent} from "../small-product-card/small-product-card.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIconButton,
    MatIcon,
    SmallProductCardComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  get cartItems(): Array<Product> {
    return this.stateCartService.cartProducts();
  }

  constructor(private stateCartService: StateCartService) {
  }

  closeCart() {
    this.stateCartService.cartIsOpen.set(false);
  }

}
