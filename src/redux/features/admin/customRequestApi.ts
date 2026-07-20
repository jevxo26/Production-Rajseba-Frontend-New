import { baseApi } from '@/redux/api/baseApi';

export const customRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomRequest: builder.mutation<any, {
      name: string;
      phone: string;
      email?: string;
      title?: string;
      description: string;
      user_id?: number;
    }>({
      query: (data) => ({
        url: '/custom-requests',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    }),
    getAllCustomRequests: builder.query<any, void>({
      query: () => '/custom-requests',
      providesTags: ['Admin'],
    }),
    getCustomRequestById: builder.query<any, string | number>({
      query: (id) => `/custom-requests/${id}`,
      providesTags: ['Admin'],
    }),
    updateCustomRequestStatus: builder.mutation<any, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/custom-requests/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Admin'],
    }),
    deleteCustomRequest: builder.mutation<any, number>({
      query: (id) => ({
        url: `/custom-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCustomRequestMutation,
  useGetAllCustomRequestsQuery,
  useGetCustomRequestByIdQuery,
  useUpdateCustomRequestStatusMutation,
  useDeleteCustomRequestMutation,
} = customRequestApi;
