import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieConsentService } from '../../core/services/cookie-consent/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss'
})
export class CookieConsentComponent {
  private consentService = inject(CookieConsentService);

  /** Show the banner only until the visitor makes a choice. */
  readonly visible = computed(() => this.consentService.consent() === null);

  acceptAll(): void {
    this.consentService.acceptAll();
  }

  acceptNecessary(): void {
    this.consentService.acceptNecessary();
  }
}
