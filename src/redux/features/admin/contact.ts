import { baseApi } from '@/redux/api/baseApi';

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<any, void>({
      query: () => '/contact',
      providesTags: ['Admin'],
    }),
    getContactById: builder.query<any, number | string>({
      query: (id) => `/contact/${id}`,
      providesTags: ['Admin'],
    }),
    updateContactStatus: builder.mutation<any, { id: number; data: any }>({
      query: ({ id, data }) => ({
        url: `/contact/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    }),
    deleteContact: builder.mutation<any, number>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetContactsQuery,
  useGetContactByIdQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
} = contactApi;
