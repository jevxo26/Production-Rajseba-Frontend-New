import { baseApi } from '@/redux/api/baseApi';

export const customShiftingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomShifting: builder.mutation<any, any>({
      query: (data) => ({
        url: '/custom-shifting',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    }),
    getAllCustomShiftings: builder.query<any, void>({
      query: () => '/custom-shifting',
      providesTags: ['Admin'],
    }),
    getCustomShiftingById: builder.query<any, string | number>({
      query: (id) => `/custom-shifting/${id}`,
      providesTags: ['Admin'],
    }),
    getCustomShiftingByVendor: builder.query<any, string | number>({
      query: (vendorId) => `/custom-shifting/vendor/${vendorId}`,
      providesTags: ['Vendor'],
    }),
    getCustomShiftingByUser: builder.query<any, string | number>({
      query: (userId) => `/custom-shifting/user/${userId}`,
      providesTags: ['Client'],
    }),
    assignVendorToShifting: builder.mutation<any, { id: number; vendorId: number }>({
      query: ({ id, vendorId }) => ({
        url: `/custom-shifting/${id}/assign`,
        method: 'PATCH',
        body: { vendorId },
      }),
      invalidatesTags: ['Admin', 'Vendor'],
    }),
    updateShiftingStatus: builder.mutation<any, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/custom-shifting/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Admin', 'Vendor'],
    }),
    updateShiftingPrice: builder.mutation<any, { id: number; price: number }>({
      query: ({ id, price }) => ({
        url: `/custom-shifting/${id}/price`,
        method: 'PATCH',
        body: { price },
      }),
      invalidatesTags: ['Admin', 'Vendor'],
    }),
    deleteCustomShifting: builder.mutation<any, number>({
      query: (id) => ({
        url: `/custom-shifting/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCustomShiftingMutation,
  useGetAllCustomShiftingsQuery,
  useGetCustomShiftingByIdQuery,
  useGetCustomShiftingByVendorQuery,
  useGetCustomShiftingByUserQuery,
  useAssignVendorToShiftingMutation,
  useUpdateShiftingStatusMutation,
  useUpdateShiftingPriceMutation,
  useDeleteCustomShiftingMutation,
} = customShiftingApi;
