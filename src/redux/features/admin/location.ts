import { baseApi } from '@/redux/api/baseApi';

export interface LocationResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface Devision {
  id: number;
  name: string;
  banglaName?: string;
  code?: string;
  longitude?: string;
  latitude?: string;
  districts?: District[];
}

export interface District {
  id: number;
  name: string;
  banglaName?: string;
  code?: string;
  longitude?: string;
  latitude?: string;
  devision?: Devision;
  areas?: Area[];
}

export interface Area {
  id: number;
  name: string;
  banglaName?: string;
  code?: string;
  longitude?: string;
  latitude?: string;
  district?: District;
}

export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Devision
    getAllDevisions: builder.query<LocationResponse<Devision[]>, void>({
      query: () => '/devision',
      providesTags: ['Devision'],
    }),
    createDevision: builder.mutation<LocationResponse<Devision>, Partial<Devision>>({
      query: (data) => ({ url: '/devision', method: 'POST', body: data }),
      invalidatesTags: ['Devision'],
    }),
    updateDevision: builder.mutation<LocationResponse<Devision>, { id: number; data: Partial<Devision> }>({
      query: ({ id, data }) => ({ url: `/devision/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: ['Devision'],
    }),
    deleteDevision: builder.mutation<LocationResponse<void>, number>({
      query: (id) => ({ url: `/devision/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Devision'],
    }),

    // District
    getAllDistricts: builder.query<LocationResponse<District[]>, void>({
      query: () => '/district',
      providesTags: ['District'],
    }),
    createDistrict: builder.mutation<LocationResponse<District>, Partial<District> & { devision_id: number }>({
      query: (data) => ({ url: '/district', method: 'POST', body: data }),
      invalidatesTags: ['District', 'Devision'],
    }),
    updateDistrict: builder.mutation<LocationResponse<District>, { id: number; data: Partial<District> & { devision_id?: number } }>({
      query: ({ id, data }) => ({ url: `/district/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: ['District', 'Devision'],
    }),
    deleteDistrict: builder.mutation<LocationResponse<void>, number>({
      query: (id) => ({ url: `/district/${id}`, method: 'DELETE' }),
      invalidatesTags: ['District', 'Devision'],
    }),

    // Area
    getAllAreas: builder.query<LocationResponse<Area[]>, void>({
      query: () => '/area',
      providesTags: ['Area'],
    }),
    createArea: builder.mutation<LocationResponse<Area>, Partial<Area> & { district_id: number }>({
      query: (data) => ({ url: '/area', method: 'POST', body: data }),
      invalidatesTags: ['Area', 'District'],
    }),
    updateArea: builder.mutation<LocationResponse<Area>, { id: number; data: Partial<Area> & { district_id?: number } }>({
      query: ({ id, data }) => ({ url: `/area/${id}`, method: 'PATCH', body: data }),
      invalidatesTags: ['Area', 'District'],
    }),
    deleteArea: builder.mutation<LocationResponse<void>, number>({
      query: (id) => ({ url: `/area/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Area', 'District'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllDevisionsQuery,
  useCreateDevisionMutation,
  useUpdateDevisionMutation,
  useDeleteDevisionMutation,
  
  useGetAllDistrictsQuery,
  useCreateDistrictMutation,
  useUpdateDistrictMutation,
  useDeleteDistrictMutation,
  
  useGetAllAreasQuery,
  useCreateAreaMutation,
  useUpdateAreaMutation,
  useDeleteAreaMutation,
} = locationApi;
