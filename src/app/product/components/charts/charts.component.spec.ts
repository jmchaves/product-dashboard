import { TestBed } from '@angular/core/testing';
import { ProductsChartsComponent } from './charts.component';
import { ProductService } from 'src/app/product/services/product.service';
import { CurrencyPipe } from '@angular/common';
import { ServiceMock } from 'src/app/test/mocks/service.mock';

describe('ProductsChartsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductService, useValue: ServiceMock,
        }, {
          provide: CurrencyPipe, useValue: ServiceMock
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ProductsChartsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`pieChart is null`, () => {
    const fixture = TestBed.createComponent(ProductsChartsComponent);
    const app = fixture.componentInstance;
    expect(app.pieChart).toBeNull();
  });
});
