import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { Image } from '../interfaces/image.interface';
import { Plant } from '../interfaces/plant.interfece';
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private readonly baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products/getAll`);
  }

  createProducts(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products/add`, product);
  }

  updateProducts(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/updata`, product);
  }

  deleteProducts(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getImageByProductId(productId: number) {
    return this.http.get<Image[]>(`${this.baseUrl}/products/images/getByProductId`);
  }

  deleteImage(imageId: number) {
    return this.http.delete<void>(`${this.baseUrl}/products/images/delete/${imageId}`);
  }
  uploadImage({ productId, file, altText, sortOrder, isPrimary }: {
    productId: number; file: File;
    altText?: string | null; sortOrder?: number | null; isPrimary?: boolean | null;
  }) {
    const form = new FormData();
    form.append('productId', String(productId));
    form.append('file', file);
    if (altText != null) form.append('altText', altText);
    if (sortOrder != null) form.append('sortOrder', String(sortOrder));
    if (isPrimary != null) form.append('isPrimary', String(isPrimary));

    return this.http.post<Image>(`${this.baseUrl}/products/images/upload`, form);
  }

  getAllPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.baseUrl}/getAll`);
  }

  getPlantById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.baseUrl}/getById/${id}`);
  }

  getPlantByProductId(productId: number): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.baseUrl}/getByProductId/${productId}`);
  }

  addPlant(plant: Omit<Plant, 'id'>): Observable<Plant> {
    return this.http.post<Plant>(`${this.baseUrl}/add`, plant);
  }

  updatePlant(id: number, plant: Plant): Observable<Plant> {
    return this.http.put<Plant>(`${this.baseUrl}/update/${id}`, plant);
  }

  deletePlant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
