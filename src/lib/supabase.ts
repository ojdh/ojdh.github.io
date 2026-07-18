import { createClient } from '@supabase/supabase-js';

const PASSCODE_STORAGE_KEY = 'camping-2025-passcode';

export function getStoredPasscode(): string | null {
  return localStorage.getItem(PASSCODE_STORAGE_KEY);
}

export function storePasscode(passcode: string) {
  localStorage.setItem(PASSCODE_STORAGE_KEY, passcode);
}

export function clearStoredPasscode() {
  localStorage.removeItem(PASSCODE_STORAGE_KEY);
}

export function createTripClient(passcode: string) {
  return createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        headers: { 'x-trip-passcode': passcode },
      },
    }
  );
}
