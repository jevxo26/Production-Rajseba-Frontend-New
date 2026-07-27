import { baseApi } from '@/redux/api/baseApi';

export interface ChatMessage {
  id: number;
  content: string;
  isRead: boolean;
  createdAt: string;
  sender: {
    id: number;
    name: string;
    email: string;
  };
  receiver: {
    id: number;
    name: string;
    email: string;
  };
}

export interface InboxItem {
  user: {
    id: number;
    name: string;
    email: string;
  };
  lastMessage: string;
  lastMessageAt: string;
  isRead: boolean;
}

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChatHistory: builder.query<ChatMessage[], string | number>({
      query: (otherUserId) => `/chat/history/${otherUserId}`,
      providesTags: ['Chat'],
    }),
    getInbox: builder.query<InboxItem[], void>({
      query: () => '/chat/inbox',
      providesTags: ['Chat'],
    }),
    markAsRead: builder.mutation<{ success: boolean }, string | number>({
      query: (senderId) => ({
        url: `/chat/read/${senderId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Chat'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetChatHistoryQuery,
  useGetInboxQuery,
  useMarkAsReadMutation,
} = chatApi;
