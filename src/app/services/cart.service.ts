import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Product, CartProduct } from '../shared/models/product';
import { signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProductsKey = 'cartProducts';
  private cartProducts = signal<Array<CartProduct>>([]);
  private productsCount = signal(0);
  private total = signal(0);
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
    const count = products.reduce((sum, product) => sum + product.quantity, 0);
    const totalAmount = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

    this.productsCount.set(count);
    this.total.set(totalAmount);
  }

  private saveCartProducts(): void {
    if (this.isBrowser) {
      localStorage.setItem(this.cartProductsKey, JSON.stringify(this.cartProducts()));
    }
    this.updateCartData();
  }

  public getCartProducts(): Signal<Array<CartProduct>> {
    return this.cartProducts;
  }

  public getProductsCount(): Signal<number> {
    return this.productsCount;
  }

  public isInCart(productId: number): boolean {
    return this.cartProducts().some(product => product.id === productId);
  }

  public getTotal(): Signal<number> {
    return this.total;
  }

  public addProduct(product: Product, quantity: number = 1): void {
    console.log('addProduct')
    console.log(this.cartProducts())
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
