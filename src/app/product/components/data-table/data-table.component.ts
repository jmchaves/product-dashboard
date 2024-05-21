import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/product/interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'products-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent {
  products: Product[] = [];
  page: number = 0;
  sortOrder: string = "";
  sortBy: string = "";
  pageCount = 0;
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService
  ){}

  ngOnInit() {
    this.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProducts() {
    this.subscription = this.productService.getAll().subscribe({
      next: (response) => {
        this.products = response;
        this.pageCount = Math.ceil(this.products.length / 10);
        this.page = 0;
      },
      error: () => {
        console.log("error");
      }
    });
  }

  sort(by: string) : void{
    this.sortBy = by;
    this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    this.products = this.productService.sort(this.sortBy, this.sortOrder);
    this.page = 0;
  }
}
