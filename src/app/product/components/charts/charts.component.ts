import { Component } from '@angular/core';
import { CurrencyPipe } from "@angular/common";
import Chart from 'chart.js/auto';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/product/interfaces/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'products-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ProductsChartsComponent {
  pieChart: any = null
  polarAreaChart: any = null;
  products: Product[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private cp: CurrencyPipe,
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
        if (this.products.length > 0) {
          this.createPieChart();
          this.createBarChart();
        }
      },
      error: () => {
        console.log("error");
      }
    });
  }

  private createPieChart(): void {
    const groupedCategories = this.productService.groupBy();
    const categories = Object.keys(groupedCategories);
    const categoriesLength = Object.keys(groupedCategories).map((key) => groupedCategories[key].length);

    this.pieChart = new Chart("pieChart", {
      type: 'pie',

      data: {
        labels: categories,
	       datasets: [{
          label: 'By Brand',
          data: categoriesLength,
          backgroundColor: this.getColors(),
          hoverOffset: 4
        }],
      },
    });
  }

  private createBarChart(): void {
    const topFive = this.productService.getTopMoreExpensive();
    const productsLabels = topFive.map(e => e.title);
    const productsPrices = topFive.map(e => e.price);

    this.polarAreaChart = new Chart("barChart", {
      type: 'bar',

      data: {
        labels: productsLabels,
	       datasets: [{
          data: productsPrices,
          backgroundColor: this.getColors(),
        }],
      },
      options: {
        plugins: {
          legend: {
              display: false,
          },
        },
        scales: {
          y: {
            ticks: {
              callback: ((value) => this.cp.transform(value, "USD")),
            }
          }
        }
      }
    });
  }

  private getColors(): string[] {
    return [
      "Red",
      "Orange",
      "Yellow",
      "Green",
      "Cyan",
      "Blue",
      "Purple",
      "Pink",
      "Brown",
      "Black",
      "Gold",
      "Khaki",
      "Crimson",
      "Lime",
      "Goldenrod",
      "Indigo",
      "Magenta",
      "Turquoise",
      "Maroon"
    ];
  }
}
