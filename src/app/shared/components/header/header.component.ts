import {Component, signal, Signal} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import { MatMiniFabButton} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";
import {StateCartService} from "../../../services/state-cart.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIcon, MatMiniFabButton, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  protected productsCount: Signal<number>;

  constructor(protected cartService: StateCartService) {
    this.productsCount = this.cartService.productsCount;
  }

  public openCart(): void {
    this.cartService.cartIsOpen.set(true);
  }
}
