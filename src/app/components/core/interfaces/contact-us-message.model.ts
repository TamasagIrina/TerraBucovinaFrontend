import { MessageStatus } from './message-status.enum';

export interface ContactUsMessage {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  subject: string;
  message: string;
  status: MessageStatus;
}
