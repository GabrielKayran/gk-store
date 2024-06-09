import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../../shared/models/product";
import {MatIcon} from "@angular/material/icon";
import {StateCartService} from "../../../../services/state-cart.service";
import {CurrencyPipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {SelectedProductStateService} from "../../../../services/selected-product-state.service";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatIcon,
    CurrencyPipe,
    MatButton,
    MatIconButton
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  protected isInCart= false;

  get selectedProduct(): Product {
    return this.selectedProductStateService.selectedProduct()!;
  }

  constructor(private cartService: StateCartService, private selectedProductStateService: SelectedProductStateService) {

  }
  ngOnInit() {
    this.isInCart = this.cartService.isInCart(this.selectedProduct.id);
  }

  public addToCart(): void {
    if (!this.isInCart) {
      this.cartService.addProduct(this.selectedProduct);
      this.isInCart = true;
    } else {
      this.cartService.removeProduct(this.selectedProduct.id);
      this.isInCart = false;
    }
  }

  public closeDetails(): void {
    this.selectedProductStateService.selectedProduct.set(null);
    this.selectedProductStateService.detailsOpen.set(false);
  }
}
