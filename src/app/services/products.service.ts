import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { Product } from "../shared/models/product";
import {environment} from "../../environments/environments";

const BASE_URL = `${environment.baseUrl}/category/men's%20clothing`;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(BASE_URL).pipe(
      catchError((error) => {
        console.error('Erro ao buscar produtos:', error);
        return throwError(() => new Error('Falha ao buscar produtos. Por favor, tente novamente mais tarde.'));
      })
    );
  }
}
