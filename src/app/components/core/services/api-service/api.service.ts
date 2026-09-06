import { HttpClient, HttpContext, HttpContextToken, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductRequest, ProductResponse } from '../../interfaces/product.interface';
import { Image } from '../../interfaces/image.interface';
import { Plant } from '../../interfaces/plant.interfece';
import { Order, OrderResponse } from '../../interfaces/order.interface';
import { Review, ReviewRequest } from '../../interfaces/review.inerface';
import { User, UserSelfUpdateRequest, PasswordChangeRequest } from '../../interfaces/user.interface';
import { ContactUsMessage } from '../../interfaces/contact-us-message.model';
import { MessageStatus } from '../../interfaces/message-status.enum';
import { Category } from '../../interfaces/category.interface';
import { ChartDataResponse, DashboardKpiResponse } from '../../interfaces/dashboard.interface';
import { PageResponse } from '../../interfaces/page.interface';
import { ChatResponse } from '../../interfaces/chat.interface';
export const REQUIRES_AUTH = new HttpContextToken<boolean>(() => false);

@Injectable({
  providedIn: 'root'
})

export class ApiService {



  private readonly baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  getProducts(includeInactive = false): Observable<ProductResponse[]> {
    const params = new HttpParams().set('includeInactive', includeInactive);
    return this.http.get<ProductResponse[]>(`${this.baseUrl}/products/get/all`, { params });
  }

  createProducts(product: ProductRequest): Observable<ProductResponse> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.post<ProductResponse>(`${this.baseUrl}/products/admin/add`, product, { context });
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/products/get/byId/${id}`);
  }

  updateProducts(id: number, product: ProductRequest): Observable<ProductResponse> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.put<ProductResponse>(`${this.baseUrl}/products/admin/update/${id}`, product, { context });
  }

  deleteProducts(id: number): Observable<void> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.delete<void>(`${this.baseUrl}/products/admin/delete/${id}`, { context });
  }

  reactivateProduct(id: number): Observable<ProductResponse> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.put<ProductResponse>(`${this.baseUrl}/products/admin/reactivate/${id}`, null, { context });
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories/get/all`);
  }

  addCategory(category: Omit<Category, 'id'>): Observable<Category> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.post<Category>(`${this.baseUrl}/categories/add`, category, { context});
  }

  getAllImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products/images/get/all`);
  }
  getImageByProductId(productId: number) {
    return this.http.get<Image[]>(`${this.baseUrl}/products/images/get/ByProductId/${productId}`);
  }

  deleteImage(imageId: number) {
    return this.http.delete<void>(`${this.baseUrl}/products/images/delete/${imageId}`);
  }

  setPrimaryImage(imageId: number): Observable<Image> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.put<Image>(`${this.baseUrl}/products/images/admin/set-primary/${imageId}`, null, { context });
  }

  reorderImages(orderedImageIds: number[]): Observable<void> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.put<void>(`${this.baseUrl}/products/images/admin/reorder`, orderedImageIds, { context });
  }
  uploadImage({ productId, file, altText, sortOrder, isPrimary }: {
    productId: number; file: File;
    altText?: string | null; sortOrder?: number | null; isPrimary?: boolean | null;
  }) {
    const context = new HttpContext().set(REQUIRES_AUTH, true);

    const form = new FormData();
    form.append('productId', String(productId));
    form.append('file', file);

    if (altText != null) form.append('altText', altText);
    if (sortOrder != null) form.append('sortOrder', String(sortOrder));
    if (isPrimary != null) form.append('isPrimary', String(isPrimary));

    return this.http.post<Image>(`${this.baseUrl}/products/images/auth/upload`, form, { context });
  }

  getAllPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.baseUrl}/products/plants/getAll`);
  }

  getPlantById(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.baseUrl}/products/plants/getById/${id}`);
  }

  getPlantByProductId(productId: number): Observable<Plant[]> {
    return this.http.get<Plant[]>(`${this.baseUrl}/products/plants/getByProductId/${productId}`);
  }

  addPlant(plant: any, file: File): Observable<Plant> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    const formData = new FormData();

    const dto = {
      name: plant.name,
      shortDescription: plant.shortDescription,
      longDescription: plant.longDescription,
      plantMessage: plant.plantMessage,
      productId: plant.product.id
    };

    formData.append(
      "plant",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    formData.append("file", file);

    return this.http.post<Plant>(`${this.baseUrl}/products/plants/admin/add`, formData, { context });
  }


  updatePlant(id: number, plant: any, file: File | null): Observable<Plant> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    const formData = new FormData();

    const dto = {
      name: plant.name,
      shortDescription: plant.shortDescription,
      longDescription: plant.longDescription,
      plantMessage: plant.plantMessage,
      productId: plant.product.id
    };

    formData.append(
      "plant",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    if (file) {
      formData.append("file", file);
    }

    return this.http.put<Plant>(`${this.baseUrl}/products/plants/admin/update/${id}`, formData, { context });
  }

  deletePlant(id: number): Observable<void> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.delete<void>(`${this.baseUrl}/products/plants/admin/delete/${id}`, { context });
  }

  addOrder(order: Order): Observable<any> {
    // Map the frontend order to the backend OrderRequestDTO shape:
    // nested product -> productId, nested user -> userId.
    const payload = {
      fullName: order.fullName,
      email: order.email,
      phone: order.phone,
      isCompanyInvoice: order.isCompanyInvoice,
      cui: order.cui,
      country: order.country,
      county: order.county,
      city: order.city,
      postalCode: order.postalCode,
      paymentMethod: order.paymentMethod,
      deliveryMethod: order.deliveryMethod,
      termsAccepted: order.termsAccepted,
      address: order.address,
      totalPrice: order.totalPrice,
      userId: order.user ? order.user.id : null,
      products: (order.products ?? []).map(p => ({
        productId: p.product.id,
        quantity: p.quantity
      }))
    };
    return this.http.post<OrderResponse>(`${this.baseUrl}/orders/add`, payload);
  }

  getAllOrders(): Observable<OrderResponse[]> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.get<OrderResponse[]>(`${this.baseUrl}/orders/get/all`, { context });
  }

  getAllOrdersPaged(page: number, size: number, status?: string): Observable<PageResponse<OrderResponse>> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<PageResponse<OrderResponse>>(`${this.baseUrl}/orders/get/all/paged`, { params, context });
  }

  getOrderByUserId(id: number): Observable<OrderResponse[]> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.get<OrderResponse[]>(`${this.baseUrl}/orders/get/byUserId/${id}`, { context });
  }

  updateOrderStatus(orderId: number, status: string) {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.put<{ message: string }>(
      `${this.baseUrl}/orders/updateStatus/${orderId}/${status}`, null, { context });
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/products/reviews/get/all`);
  }

  getAllReviewsByProductId(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/products/reviews/get/allByProductId/${productId}`);
  }

  getReviewsByProductIdPaged(productId: number, page: number, size: number): Observable<PageResponse<Review>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<PageResponse<Review>>(
      `${this.baseUrl}/products/reviews/get/allByProductId/${productId}/paged`, { params });
  }

  addReview(review: Review): Observable<Review> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.post<Review>(`${this.baseUrl}/products/reviews/add`, review, { context });
  }

  updateReview(id: number, review: ReviewRequest): Observable<Review> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.put<Review>(`${this.baseUrl}/products/reviews/update/${id}`, review, { context });
  }

  deleteReview(id: number): Observable<void> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.delete<void>(`${this.baseUrl}/products/reviews/delete/${id}`, { context });
  }

  canUserReview(userId: number, productId: number): Observable<Boolean> {
    return this.http.get<Boolean>(`${this.baseUrl}/orders/can-review/${userId}/${productId}`);
  }

  getAllContactUsMessages(): Observable<ContactUsMessage[]> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.get<ContactUsMessage[]>(`${this.baseUrl}/contact/us/admin/get/all`, { context });
  }

  addContactUsMessages(message: ContactUsMessage): Observable<ContactUsMessage> {
    return this.http.put<ContactUsMessage>(`${this.baseUrl}/contact/us/add`, message);
  }

  updateStatusContactUsMessages(id: number, status: MessageStatus, responseMessage?: string): Observable<ContactUsMessage> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    const params = new HttpParams()
      .set('id', id.toString())
      .set('status', status)
      .set('message', responseMessage!);
    return this.http.patch<ContactUsMessage>(`${this.baseUrl}/contact/us/admin/update/status`, params, { context });
  }

  // ---- Admin dashboard analytics (admin-only endpoints) ----

  chat(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(`${this.baseUrl}/chat`, { message });
  }

  // ---- Self-service account (authenticated user editing their own profile) ----

  getCurrentUser(): Observable<User> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.get<User>(`${this.baseUrl}/user/me`, { context });
  }

  updateCurrentUser(payload: UserSelfUpdateRequest): Observable<User> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.put<User>(`${this.baseUrl}/user/me`, payload, { context });
  }

  requestPasswordChange(payload: PasswordChangeRequest): Observable<string> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.post<string>(`${this.baseUrl}/user/me/password/change-request`, payload,
      { context, responseType: 'text' as 'json' });
  }

  getDashboardKpis(): Observable<DashboardKpiResponse> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    return this.http.get<DashboardKpiResponse>(`${this.baseUrl}/admin/dashboard/kpis`, { context });
  }

  getPopularProducts(limit: number = 5): Observable<ChartDataResponse> {
    const context = new HttpContext().set(REQUIRES_AUTH, true);
    const params = new HttpParams().set('limit', limit);
    return this.http.get<ChartDataResponse>(`${this.baseUrl}/admin/dashboard/popular-products`, { params, context });
  }

}
