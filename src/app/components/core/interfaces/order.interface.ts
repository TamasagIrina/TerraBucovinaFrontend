import { OrderProduct } from './orederProduct.interface';
import { User } from './user.interface';

/**
 * @deprecated Request-shaped model still used by the checkout form; the HTTP
 * service maps it to the backend OrderRequestDTO. For reading orders use
 * {@link OrderResponse}.
 */
export interface Order {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  isCompanyInvoice: boolean;
  cui?: string | null;

  country: string;
  county: string;
  city: string;
  postalCode: string;

  paymentMethod: string;
  deliveryMethod: string;
  address: string;

  termsAccepted: boolean;

  products: OrderProduct[];

  createdAt: string | null;

  status: string | null;

  totalPrice: number;

  user: User |  null;
}

/**
 * A single line of an order as returned by the backend
 * (OrderProductResponseDTO): the product is flattened to id/name/price.
 */
export interface OrderProductResponse {
  id: number;
  orderId: number | null;
  productId: number | null;
  productName: string | null;
  productPrice: number | null;
  quantity: number | null;
}

/**
 * Read model for an order as returned by the backend (OrderResponseDTO).
 * The placing user is exposed as userId; line items are OrderProductResponse.
 */
export interface OrderResponse {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  isCompanyInvoice: boolean | null;
  cui: string | null;
  country: string;
  county: string;
  city: string;
  postalCode: string;
  paymentMethod: string;
  deliveryMethod: string;
  termsAccepted: boolean | null;
  termsAcceptedAt: string | null;
  termsVersion: string | null;
  address: string;
  totalPrice: number;
  createdAt: string | null;
  status: string | null;
  userId: number | null;
  products: OrderProductResponse[];
}
