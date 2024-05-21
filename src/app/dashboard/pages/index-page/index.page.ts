import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from 'src/app/product/interfaces/product';
import { ProductService } from 'src/app/product/services/product.service';
import { take } from "rxjs/operators";

@Component({
  selector: 'dashboard-index-page',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss']
})
export class DashboardIndexPage {
  public activeTab: string = "";
  products: Product[] = [];
  newProductAdded: boolean = false;
  searchPhrase: string = "";
  errorFromServer: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit() {
    this.handleRouter();
    this.getProducts();
  }

  searchByTitle() {
    this.router.navigateByUrl("/dashboard/table").finally(() => {
      if (this.searchPhrase) {
        const filteredProducts = this.products.filter(e => e.title?.toLowerCase()?.includes(this.searchPhrase.toLowerCase()));
        this.productService.setList(filteredProducts);
      } else {
        this.productService.setList(this.products);
      }
    });
  }

  cleanSearchAndRedirect(redirectTo: string): void {
    this.searchPhrase = "";
    this.router.navigateByUrl(redirectTo).finally(() => {
      this.productService.setList(this.products);
    });
  }

  private handleRouter() {
    this.route.queryParams.subscribe(params => {
      if ("newProduct" in params) {
        this.handleNewProductDisplay();
      }
    });
  }

  private getProducts() {
    this.productService.getAll().pipe(take(1)).subscribe({
      next: (response) => {
        if (response.length <= 0) {
          this.getProductsFromServer();
        }
      },
      error: () => {
        console.log("error");
      }
    });
  }

  private getProductsFromServer() {
    this.productService.getAllFromServer({limit: 100}).pipe(take(1)).subscribe({
      next: (response) => {
        this.products = response;
        this.productService.setList(response);
      },
      error: () => {
        this.errorFromServer = true;
      }
    });
  }

  private handleNewProductDisplay(newOne: boolean = true) {
    this.newProductAdded = newOne;
    setTimeout(() => {
      this.newProductAdded = false;
      this.router.navigateByUrl("/dashboard/table");
    }, 3000);
  }
}
