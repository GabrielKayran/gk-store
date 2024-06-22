import {Component, Input, Output} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {Product} from "../../../../shared/models/product";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {StateCartService} from "../../../../services/state-cart.service";
import {ProductDetailsComponent} from "../product-details/product-details.component";
import {SelectedProductStateService} from "../../../../services/selected-product-state.service";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CurrencyPipe,
    MatIcon,
    MatMiniFabButton,
    ProductDetailsComponent
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent{
  @Input() public product: Product = {} as Product;
  @Output() public selectedProduct: Product = {} as Product;


  constructor(protected cartService: StateCartService, private selectedProductStateService: SelectedProductStateService) {

  }

  public addToCart(): void {
    if (!this.cartService.isInCart(this.product.id)) {
      this.cartService.addProduct(this.product);
    } else {
      this.cartService.removeProduct(this.product.id);
    }
  }

  public selectProduct(): void {
    this.selectedProductStateService.selectedProduct.set(this.product);
    this.selectedProductStateService.detailsOpen.set(true);
  }

}
