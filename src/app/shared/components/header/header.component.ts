import {Component, signal, Signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import { MatMiniFabButton} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import {CartService} from "../../../services/cart.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIcon, MatMiniFabButton, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected productsCount: Signal<number> = signal(0);

  constructor(private cartService: CartService) {
    this.productsCount = this.cartService.getProductsCount();
  }
}
