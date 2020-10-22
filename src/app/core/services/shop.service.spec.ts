import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ShopService } from './shop.service';
import { HttpClient } from '@angular/common/http';
import { ShopCategory } from 'src/app/core/models/shop-category'
import { ShopProduct } from '../models/shop-product';

describe('ShopService', () => {
  let service: ShopService;
  let httpClient: HttpClient; 
  let httpTestingController: HttpTestingController;
  const baseUrl: string = environment.baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShopService]
    });
    service = TestBed.inject(ShopService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get categories', () => {
    const url: string = `${baseUrl}/store/public/categories/active`;
    const mockData: ShopCategory[] = [
      {id: 1, displayName: 'test1'},
      {id: 2, displayName: 'test2'}
    ]

    service.getCategories().subscribe(data => {
      expect(data).toEqual(mockData);
    })

    const req = httpTestingController.expectOne(url);
    req.flush(mockData);

    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  })

  it('should get category', () => {
    const url: string = `${baseUrl}/store/public/category/1`;
    const mockData: ShopCategory = {
      id: 1,
      displayName: 'test'
    }

    service.getCategory(1).subscribe(data => {
      expect(data).toEqual(mockData);
    })

    const req = httpTestingController.expectOne(url);
    req.flush(mockData);

    expect(req.request.method).toEqual('GET');
    httpTestingController.verify();
  })

  it('should get products by category', () => {
    const url: string = `${baseUrl}/store/public/category/products/active/1`;
    const mockData: ShopProduct[] = [
      {
        description: 'test',
        displayName: 'test',
        id: 1,
        price: 1,
        storeCategoryId: 1
      },
      {
        description: 'test1',
        displayName: 'test1',
        id: 2,
        price: 1,
        storeCategoryId: 1
      }
    ]

    service.getProductsByCategory(1).subscribe(data => {
      expect(data).toEqual(mockData);
    })

    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toEqual('GET');

    httpTestingController.verify();
  })

  it('should get product',() => {
    const url: string = `${baseUrl}/store/public/category/product/1`;
    const mockData: ShopProduct = {
      description: 'test',
      displayName: 'test',
      id: 1,
      price: 1,
      storeCategoryId: 1
    }

    service.getProduct(1).subscribe(data => {
      expect(data).toEqual(mockData);
    })

    const req = httpTestingController.expectOne(url);
    req.flush(mockData);
    expect(req.request.method).toEqual('GET');

    httpTestingController.verify();
  })
});