import { baseApi } from '@/redux/api/baseApi';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Example endpoint
    // getAdminProfile: builder.query<any, void>({
    //   query: () => '/admin/profile',
    //   providesTags: ['Admin'],
    // }),
  }),
  overrideExisting: false,
});

// export const { useGetAdminProfileQuery } = adminApi;
