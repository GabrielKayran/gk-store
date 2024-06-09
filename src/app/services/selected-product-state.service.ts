import {Injectable, signal} from '@angular/core';
import {Product} from "../shared/models/product";

@Injectable({
  providedIn: 'root'
})
export class SelectedProductStateService {
  public selectedProduct = signal<Product | null>(null);
  public  detailsOpen = signal<boolean>(false);
  constructor() { }
}
