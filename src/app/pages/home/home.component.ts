import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../shared/models/product";
import {HeaderComponent} from "../../shared/components/header/header.component";
import {ProductCardComponent} from "./components/product-card/product-card.component";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProductCardComponent, MatIconButton, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Array<Product> = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  scrollLeft() {
    const productsContainer = document.querySelector('.products');
    productsContainer!.scrollBy({ left: -300, behavior: 'smooth' });
  }
  scrollRight() {
    const productsContainer = document.querySelector('.products');
    productsContainer!.scrollBy({ left: 300, behavior: 'smooth' });
  }


}
