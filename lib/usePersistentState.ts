'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * Drop-in replacement for useState that persists the value to sessionStorage
 * under `key`. This lets UI state (e.g. selected filters) survive client-side
 * navigation — for example visiting a product detail page and coming back to
 * the listing. Values are scoped to the browser tab/session and reset when the
 * tab is closed.
 */
export function usePersistentState<T>(
  key: string,
  initial: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [state, setState] = useState<T>(initial);
  // Becomes true once we've read any saved value; gates saving so we never
  // clobber a stored value with the default before restoring it.
  const [hydrated, setHydrated] = useState(false);

  // Restore once on mount (client only).
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(key);
      if (saved !== null) {
        setState(JSON.parse(saved) as T);
      }
    } catch (error) {
      console.error(`Error restoring "${key}" from sessionStorage:`, error);
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Persist whenever the value changes (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving "${key}" to sessionStorage:`, error);
    }
  }, [key, state, hydrated]);

  return [state, setState, hydrated];
}
