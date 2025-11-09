import { Order } from "./order.interface";
import { Role } from "./role.interface";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string | null;
  roles: Role[] | null;
  enabled: boolean | null;
  orders: Order[] | null;
}
