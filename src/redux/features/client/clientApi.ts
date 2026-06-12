import { baseApi } from '@/redux/api/baseApi';

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Example endpoint
    // getClientProfile: builder.query<any, void>({
    //   query: () => '/client/profile',
    //   providesTags: ['Client'],
    // }),
  }),
  overrideExisting: false,
});

// export const { useGetClientProfileQuery } = clientApi;
