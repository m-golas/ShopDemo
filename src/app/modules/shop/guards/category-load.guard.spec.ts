import { async, TestBed } from '@angular/core/testing';

import { CategoryLoadGuard } from './category-load.guard';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CategoryLoadGuard', () => {
  let guard: CategoryLoadGuard;
  let mockStore: MockStore;
  let httpClient: HttpClient; 
  let httpTestingController: HttpTestingController;
  let router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore(),{provide: Router, useValue: router}]
    });
    guard = TestBed.inject(CategoryLoadGuard);
    mockStore = TestBed.inject(MockStore);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});