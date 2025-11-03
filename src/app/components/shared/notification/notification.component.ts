import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-notification',
  imports: [CommonModule, MatIcon],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  @Input() message: string | null = null;
  @Input() type: 'success' | 'error' | 'info' | 'warning' = 'info';
  @Input() show = false;

  close() {
    this.show = false;
  }
}
