import { Order } from "./order.interface";
import { Role } from "./role.interface";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string | null;
  fullName?: string | null;
  address?: string | null;
  roles: Role[] | null;
  enabled: boolean | null;
  orders: Order[] | null;
}

/**
 * Payload sent to `PUT /api/user/me` to update the logged-in user's own
 * profile. Email and password are excluded on purpose — see
 * `PasswordChangeRequest` for password changes.
 */
export interface UserSelfUpdateRequest {
  username: string;
  fullName: string | null;
  address: string | null;
}

/**
 * Payload sent to `POST /api/user/me/password/change-request`. The new
 * password only takes effect once the user confirms it via the email link.
 */
export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}
