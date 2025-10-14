/**
 * Decodează un token JWT (JSON Web Token)
 * și returnează payload-ul ca obiect JavaScript.
 */
function base64UrlDecode(input: string): string {
  // JWT folosește Base64 URL-safe, deci înlocuim caracterele speciale
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  // adăugăm padding (=) dacă lipsește
  const pad = input.length % 4 ? 4 - (input.length % 4) : 0;
  return atob(input + '='.repeat(pad));
}

/**
 * Decodează payload-ul unui token JWT.
 * @param token Tokenul JWT (format header.payload.signature)
 * @returns Payload-ul ca obiect sau null dacă tokenul e invalid
 */
export function decodeJwt<T = any>(token: string): T | null {
  try {
    const [, payload] = token.split('.');
    return JSON.parse(base64UrlDecode(payload)) as T;
  } catch (error) {
    console.error('Eroare la decodificarea JWT:', error);
    return null;
  }
}

/**
 * Returnează data de expirare din token (claim-ul `exp`)
 */
export function getExpDate(token: string): Date | null {
  const payload = decodeJwt<any>(token);
  if (!payload?.exp) return null;
  // `exp` este în secunde Unix — îl convertim la milisecunde
  return new Date(payload.exp * 1000);
}

/**
 * Returnează data la care a fost emis tokenul (`iat`)
 */
export function getIatDate(token: string): Date | null {
  const payload = decodeJwt<any>(token);
  if (!payload?.iat) return null;
  return new Date(payload.iat * 1000);
}

/**
 * Verifică dacă tokenul este expirat.
 * @param token Tokenul JWT
 * @param skewSeconds (opțional) Toleranță în secunde
 * @returns true dacă e expirat, false dacă e valid
 */
export function isExpired(token: string, skewSeconds = 0): boolean {
  const exp = getExpDate(token);
  if (!exp) return true;
  const now = Date.now();
  return now >= exp.getTime() - skewSeconds * 1000;
}

/**
 * Returnează timpul rămas (în milisecunde) până la expirare.
 */
export function timeLeftMs(token: string): number {
  const exp = getExpDate(token);
  if (!exp) return 0;
  return Math.max(0, exp.getTime() - Date.now());
}
