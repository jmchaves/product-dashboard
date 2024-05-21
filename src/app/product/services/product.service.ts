import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Product } from "../interfaces/product";
import { CommonFunctions } from 'src/app/shared/tools/commonFunctions';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  api = `${environment.apiUrl}products`;
  private productsSource = new BehaviorSubject<Product[]>([]);

  constructor(
    private http: HttpClient,
  ) { }

  getAllFromServer(params?: any): Observable<Product[]> {
    return this.http.get<Product[]>(this.api, { params }).pipe(
      mergeMap(async (response: any) => this.deserializeMany(response)),
    );
  }

  add(prod: Product): Product {
    const products = this.productsSource.getValue();
    products.unshift(prod);
    this.setList(products);
    return prod;
  }

  getAll(): BehaviorSubject<Product[]> {
    return this.productsSource;
  }

  setList(products: Product[]): void {
    this.productsSource.next(products);
  }

  groupBy(field: string = "category") {
    return CommonFunctions.groupBy(this.productsSource.getValue(), field);
  }

  getTopMoreExpensive(limit: number = 5) {
    return this.productsSource.getValue().sort((a, b) => b.price - a.price).slice(0, limit);
  }

  sort(column: string, sortOrder: string): Product[]{
    return this.productsSource.getValue().sort((a, b) => {
      let first = eval(`a.${column}`) as string;
      first = typeof first === "string" ? first.toUpperCase() : first;
      let second = eval(`b.${column}`) as string;
      second = typeof second === "string" ? second.toUpperCase() : second;
      if (sortOrder === "asc") {
        if(first < second) { return -1; }
        else if(first > second) { return 1; }
        else { return 0; }
      } else {
        if(second < first) { return -1; }
        else if (second > first) { return 1; }
        else { return 0; }
      }
    });
  }

  private deserializeMany(data: any): Product[] {
    let products:Product[] = [];
    data.products.forEach((element: Product) => {
      products.push(element);
    });
    return products;
  }
}
