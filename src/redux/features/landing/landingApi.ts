import { baseApi } from '@/redux/api/baseApi';

export const landingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Example endpoint
    // getLandingData: builder.query<any, void>({
    //   query: () => '/landing/data',
    //   providesTags: ['Landing'],
    // }),
  }),
  overrideExisting: false,
});

// export const { useGetLandingDataQuery } = landingApi;
