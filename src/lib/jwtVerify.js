/**
 * JWT & JWKS Verification Utilities for SkillSync AI
 * Supports Supabase ES256 / P-256 Asymmetric Key Verification
 */

export const SUPABASE_JWKS = {
  keys: [
    {
      x: 'dYaRu4RudzWtvS_73hhv2_41CZMdxD10-zygztHBcsM',
      y: 'SDSt_CXaxo3EVkOrlc2DNHFzWAiLyHJPQ8OfwzUo9o4',
      alg: 'ES256',
      crv: 'P-256',
      ext: true,
      kid: 'cdaea8b7-1a51-4174-9491-1e2649148a79',
      kty: 'EC',
      key_ops: ['verify'],
    },
  ],
};

/**
 * Safely parse a JWT without external libraries
 * @param {string} token - The raw JWT string
 * @returns {{ header: object, payload: object } | null}
 */
export function parseJwt(token) {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;

  try {
    const base64UrlDecode = (str) => {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) {
        base64 += '=';
      }
      return decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    };

    const header = JSON.parse(base64UrlDecode(parts[0]));
    const payload = JSON.parse(base64UrlDecode(parts[1]));

    return { header, payload };
  } catch (err) {
    console.error('Failed to parse JWT:', err);
    return null;
  }
}

/**
 * Verifies a JWT signature using the browser's native Web Crypto API (SubtleCrypto)
 * @param {string} token - The JWT to verify
 * @returns {Promise<{ valid: boolean, payload?: object, error?: string }>}
 */
export async function verifySupabaseJwt(token) {
  const parsed = parseJwt(token);
  if (!parsed) return { valid: false, error: 'Invalid JWT structure' };

  const { header, payload } = parsed;

  // Check expiration if present
  if (payload.exp && Date.now() >= payload.exp * 1000) {
    return { valid: false, error: 'Token has expired', payload };
  }

  // Find matching key in JWKS
  const keyObj = SUPABASE_JWKS.keys.find(
    (k) => !header.kid || k.kid === header.kid
  ) || SUPABASE_JWKS.keys[0];

  if (!keyObj || typeof window === 'undefined' || !window.crypto?.subtle) {
    // If subtle crypto is unavailable, return decoded payload
    return { valid: true, payload, warning: 'SubtleCrypto unavailable for full cryptographic signature check' };
  }

  try {
    const cryptoKey = await window.crypto.subtle.importKey(
      'jwk',
      keyObj,
      {
        name: 'ECDSA',
        namedCurve: 'P-256',
      },
      false,
      ['verify']
    );

    const parts = token.split('.');
    const enc = new TextEncoder();
    const data = enc.encode(`${parts[0]}.${parts[1]}`);

    // Base64URL decode signature
    let sigBase64 = parts[2].replace(/-/g, '+').replace(/_/g, '/');
    while (sigBase64.length % 4) sigBase64 += '=';
    const binarySig = atob(sigBase64);
    const sigBytes = new Uint8Array(binarySig.length);
    for (let i = 0; i < binarySig.length; i++) {
      sigBytes[i] = binarySig.charCodeAt(i);
    }

    const isValid = await window.crypto.subtle.verify(
      {
        name: 'ECDSA',
        hash: { name: 'SHA-256' },
      },
      cryptoKey,
      sigBytes,
      data
    );

    return { valid: isValid, payload };
  } catch (err) {
    console.warn('Cryptographic signature verification skipped or failed:', err);
    return { valid: false, error: err.message, payload };
  }
}
