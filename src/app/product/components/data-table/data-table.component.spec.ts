import { TestBed } from '@angular/core/testing';
import { DataTableComponent } from './data-table.component';
import { ProductService } from 'src/app/product/services/product.service';
import { ServiceMock } from 'src/app/test/mocks/service.mock';

describe('DataTableComponent', () => {
  const service = new ServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DataTableComponent
      ],
      providers: [
        {
          provide: ProductService, useValue: ServiceMock,
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DataTableComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
