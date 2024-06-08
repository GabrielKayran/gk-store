import { Injectable } from '@angular/core';
import {environment} from "../../environments/environments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../shared/models/product";

const BASE_URL = `${environment.baseUrl}/category/men's%20clothing`;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }


  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(BASE_URL);
  }
}
