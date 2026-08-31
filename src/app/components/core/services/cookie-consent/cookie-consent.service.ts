import { Injectable, signal } from '@angular/core';

export type CookieConsent = 'all' | 'necessary';

/**
 * Persists the visitor's cookie choice and exposes it as a signal so the rest
 * of the app can react (e.g. only initialize analytics/marketing when consent
 * is 'all'). Strictly-necessary cookies — like the auth token — always work.
 */
@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly KEY = 'cookie-consent';

  /** Current stored consent, or null if the visitor hasn't decided yet. */
  readonly consent = signal<CookieConsent | null>(this.read());

  private read(): CookieConsent | null {
    const v = localStorage.getItem(this.KEY);
    return v === 'all' || v === 'necessary' ? v : null;
  }

  hasDecided(): boolean {
    return this.consent() !== null;
  }

  /** True only when the visitor opted into optional (analytics/marketing) cookies. */
  analyticsAllowed(): boolean {
    return this.consent() === 'all';
  }

  acceptAll(): void {
    this.store('all');
  }

  acceptNecessary(): void {
    this.store('necessary');
  }

  private store(value: CookieConsent): void {
    localStorage.setItem(this.KEY, value);
    this.consent.set(value);
  }
}
