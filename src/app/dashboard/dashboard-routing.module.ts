import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardIndexPage } from './pages/index-page/index.page';
import { DataTableComponent } from '../product/components/data-table/data-table.component';
import { ProductsChartsComponent } from '../product/components/charts/charts.component';
import { ProductCreationComponent } from '../product/components/new-product/new-product.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardIndexPage,
    children: [
      {
        path: "table",
        component: DataTableComponent
      },
      {
        path: "charts",
        component: ProductsChartsComponent
      },
      {
        path: "new/product",
        component: ProductCreationComponent
      },
      {
        path: "",
        redirectTo: "/dashboard/table",
        pathMatch: "full"
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
