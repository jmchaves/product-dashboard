import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardIndexPage } from './pages/index-page/index.page';
import { DataTableComponent } from '../product/components/data-table/data-table.component';
import { ProductsChartsComponent } from '../product/components/charts/charts.component';
import { SortIconComponent } from '../shared/components/sort-icon/sort-icon.component';
import { ProductCreationComponent } from '../product/components/new-product/new-product.component';

import { ProductService } from '../product/services/product.service';

@NgModule({
  declarations: [
    DashboardIndexPage,
    DataTableComponent,
    ProductsChartsComponent,
    SortIconComponent,
    ProductCreationComponent
  ],
  imports: [
    DashboardRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductService,
    CurrencyPipe
  ]
})
export class DashboardModule { }
