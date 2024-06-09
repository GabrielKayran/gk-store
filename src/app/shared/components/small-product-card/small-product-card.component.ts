import {Component, Input} from '@angular/core';
import {Product} from "../../models/product";
import {CurrencyPipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {StateCartService} from "../../../services/state-cart.service";

@Component({
  selector: 'app-small-product-card',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatButton
  ],
  templateUrl: './small-product-card.component.html',
  styleUrl: './small-product-card.component.scss'
})
export class SmallProductCardComponent {
  @Input() public product: Product = {} as Product;

  constructor(private stateCartService: StateCartService) {

  }

  public removeToCart(productId: number): void {
    this.stateCartService.removeProduct(productId);
  }
}
