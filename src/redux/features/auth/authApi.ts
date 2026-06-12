import { baseApi } from '@/redux/api/baseApi';
import { User, setUser } from './authSlice';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, void>({
      query: () => '/auth/me',
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const userData = (data as any).user || data;
          dispatch(setUser(userData));
        } catch (err) {
          // do nothing, global error handler or component can handle
        }
      },
    }),
    login: builder.mutation<User, any>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // We rely on the component to call `setTokens` or update store, or we could do it here
      // But baseApi already handles attaching the token from localStorage if we set it.
    }),
    register: builder.mutation<User, any>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    verifyOtp: builder.mutation<any, { phone: string; otp: string }>({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
    }),
    resendOtp: builder.mutation<any, { phone: string }>({
      query: (data) => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserProfileQuery, useLoginMutation, useRegisterMutation, useVerifyOtpMutation, useResendOtpMutation, useLazyGetUserProfileQuery } = authApi;
