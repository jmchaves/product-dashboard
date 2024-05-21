import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardIndexPage } from './index.page';
import { ProductService } from 'src/app/product/services/product.service';
import { ServiceMock } from '../../../test/mocks/service.mock';

describe('DashboardIndexPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        DashboardIndexPage
      ],
      providers: [
        {
          provide: ProductService, useValue: ServiceMock
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DashboardIndexPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as products []`, () => {
    const fixture = TestBed.createComponent(DashboardIndexPage);
    const app = fixture.componentInstance;
    expect(app.products).toEqual([]);
  });

  it('newProductAdded be false', () => {
    const fixture = TestBed.createComponent(DashboardIndexPage);
    const app = fixture.componentInstance;
    expect(app.newProductAdded).toBeFalse()
  });
});
