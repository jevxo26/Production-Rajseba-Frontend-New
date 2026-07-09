import { baseApi } from "../../api/baseApi";

export const helpApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHelpArticles: builder.query<any, { search?: string; category?: string } | void>({
      query: (params) => ({
        url: "/help/articles",
        params: params || {},
      }),
      providesTags: ["Help"],
    }),
    getSupportTickets: builder.query<any, void>({
      query: () => "/help/tickets",
      providesTags: ["Help"],
    }),
    getTicketDetails: builder.query<any, number>({
      query: (id) => `/help/tickets/${id}`,
      providesTags: (result, error, id) => [{ type: "Help", id }],
    }),
    createSupportTicket: builder.mutation<any, { subject: string; category: string; priority: string; description: string }>({
      query: (body) => ({
        url: "/help/tickets",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Help"],
    }),
    addTicketReply: builder.mutation<any, { id: number; message: string }>({
      query: ({ id, message }) => ({
        url: `/help/tickets/${id}/reply`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: (result, error, { id }) => ["Help", { type: "Help", id }],
    }),
    getAdminTickets: builder.query<any, void>({
      query: () => "/help/admin/tickets",
      providesTags: ["Help"],
    }),
    updateAdminTicketStatus: builder.mutation<any, { id: number; status: string }>({
      query: ({ id, status }) => ({
        url: `/help/admin/tickets/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => ["Help", { type: "Help", id }],
    }),
    addAdminTicketReply: builder.mutation<any, { id: number; message: string }>({
      query: ({ id, message }) => ({
        url: `/help/admin/tickets/${id}/reply`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: (result, error, { id }) => ["Help", { type: "Help", id }],
    }),
  }),
});

export const {
  useGetHelpArticlesQuery,
  useGetSupportTicketsQuery,
  useGetTicketDetailsQuery,
  useCreateSupportTicketMutation,
  useAddTicketReplyMutation,
  useGetAdminTicketsQuery,
  useUpdateAdminTicketStatusMutation,
  useAddAdminTicketReplyMutation,
} = helpApi;
