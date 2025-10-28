import { OrderProduct } from './orederProduct.interface';


export interface Order {
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

  products: OrderProduct[];

  userId: number | null;
}
