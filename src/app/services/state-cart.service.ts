import {Injectable, Inject, PLATFORM_ID, computed} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product, CartProduct } from '../shared/models/product';
import { signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateCartService {
  private cartProductsKey = 'cartProducts';
  public cartProducts = signal<Array<CartProduct>>([]);
  public productsCount = computed(() => this.cartProducts().length);

  public total = signal(0);
  public cartIsOpen = signal(false);
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    const storedCartProducts = this.isBrowser ? localStorage.getItem(this.cartProductsKey) : null;
    const initialCartProducts = storedCartProducts ? JSON.parse(storedCartProducts) : [];
    this.cartProducts.set(initialCartProducts);
    this.updateCartData();
  }

  private updateCartData(): void {
    const products = this.cartProducts();
    const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    this.total.set(totalAmount);
  }

  private saveCartProducts(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.cartProductsKey, JSON.stringify(this.cartProducts()));
    }
    this.updateCartData();
  }

  public isInCart(productId: number): boolean {
    return this.cartProducts().some(product => product.id === productId);
  }

  public addProduct(product: Product, quantity: number = 1): void {
    const products = [...this.cartProducts()];
    const existingProduct = products.find(p => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      const cartProduct: CartProduct = { ...product, quantity };
      products.push(cartProduct);
    }
    this.cartProducts.set(products);
    this.saveCartProducts();
  }

  public removeProduct(productId: number): void {
    console.log('removeProduct')
    console.log(this.cartProducts())
    const products = this.cartProducts().filter(product => product.id !== productId);
    this.cartProducts.set(products);
    this.saveCartProducts();
  }

  public clearCart(): void {
    this.cartProducts.set([]);
    this.saveCartProducts();
  }
}
