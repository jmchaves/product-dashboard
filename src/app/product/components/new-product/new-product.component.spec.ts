import { TestBed } from '@angular/core/testing';
import { ProductCreationComponent } from './new-product.component';
import { ProductService } from 'src/app/product/services/product.service';
import { ServiceMock } from 'src/app/test/mocks/service.mock';

describe('ProductCreationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductService, useValue: ServiceMock,
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ProductCreationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
