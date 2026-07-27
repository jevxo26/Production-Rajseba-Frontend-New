import { baseApi } from '@/redux/api/baseApi';

export const vendorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Example endpoint
    // getVendorProfile: builder.query<any, void>({
    //   query: () => '/vendor/profile',
    //   providesTags: ['Vendor'],
    // }),
  }),
  overrideExisting: false,
});

// export const { useGetVendorProfileQuery } = vendorApi;
