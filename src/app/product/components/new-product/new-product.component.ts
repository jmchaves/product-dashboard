import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'product-creation',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class ProductCreationComponent {
  form: FormGroup = new FormGroup({});
  brands: string[] = [];
  categories: string[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private router: Router,
  ){}

  ngOnInit() {
    this.createForm();
    this.getLists();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const newProduct = this.form.getRawValue();
      this.productService.add(newProduct);
      this.router.navigateByUrl("/dashboard/table?newProduct");
    }
  }

  get title(): FormControl {
    return this.form.get("title") as FormControl;
  }

  get description(): FormControl {
    return this.form.get("description") as FormControl;
  }

  get price(): FormControl {
    return this.form.get("price") as FormControl;
  }

  get rating(): FormControl {
    return this.form.get("rating") as FormControl;
  }

  get brand(): FormControl {
    return this.form.get("brand") as FormControl;
  }

  get category(): FormControl {
    return this.form.get("category") as FormControl;
  }

  private createForm(): void {
    this.form = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required, Validators.pattern(/^\d+(,\d{3})*(\.\d{1,2})?$/)]),
      rating: new FormControl("", [Validators.required, Validators.pattern(/^(5|[1-5])(\.\d{1,2})?$/)]),
      brand: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
    });
  }

  private getLists() {
    this.subscription = this.productService.getAll().subscribe({
      next: () => {
        this.categories = Object.keys(this.productService.groupBy("category"));
        this.brands = Object.keys(this.productService.groupBy("brand"));
      },
      error: () => {
        console.log("error");
      }
    });
  }
}
