"use client";

import { useCallback, useRef } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { logSearch } from "@/redux/features/admin/searchLogSlice";
import { usePathname } from "next/navigation";

/**
 * useSearchLogger — logs search queries to Redux (persisted via localStorage).
 * Includes 600ms debounce to avoid logging every keystroke.
 */
export function useSearchLogger() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const trackSearch = useCallback(
    (query: string) => {
      if (!query || query.trim().length < 2) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        dispatch(logSearch({ query: query.trim(), page: pathname }));
      }, 600);
    },
    [dispatch, pathname]
  );

  return { trackSearch };
}
