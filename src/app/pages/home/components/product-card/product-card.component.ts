import {Component, computed, Input, OnInit, Signal} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {Product} from "../../../../shared/models/product";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {CartService} from "../../../../services/cart.service";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    MatIcon,
    MatMiniFabButton
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnInit{
  @Input() public product: Product = {} as Product;
  protected isInCart= false;

  constructor(private cartService: CartService) {

  }
  ngOnInit() {
    this.isInCart = this.cartService.isInCart(this.product.id);
  }

  public addToCart(): void {
    if (!this.isInCart) {
      this.cartService.addProduct(this.product);
      this.isInCart = true;
    } else {
      this.cartService.removeProduct(this.product.id);
      this.isInCart = false;
    }
  }
}
