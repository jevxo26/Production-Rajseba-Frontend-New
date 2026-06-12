import { baseApi } from '@/redux/api/baseApi';

export const agentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Example endpoint
    // getAgentProfile: builder.query<any, void>({
    //   query: () => '/agent/profile',
    //   providesTags: ['Agent'],
    // }),
  }),
  overrideExisting: false,
});

// export const { useGetAgentProfileQuery } = agentApi;
