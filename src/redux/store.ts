import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import authReducer from './features/auth/authSlice';
import wishlistReducer from './features/wishlist/wishlistSlice';
import ticketReducer from './features/admin/ticketSlice';
import searchLogReducer from './features/admin/searchLogSlice';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    tickets: ticketReducer,
    searchLogs: searchLogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
