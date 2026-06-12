'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<typeof store>(null);
  
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
