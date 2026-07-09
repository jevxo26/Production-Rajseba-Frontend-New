import { baseApi } from '@/redux/api/baseApi';
import { Service, NestedService, ServiceApiResponse } from '@/redux/features/admin/service';

/* ==========================================================================
   PACKAGE TYPES
   ========================================================================== */

export interface PackageItem {
  id: number;
  nestedService: NestedService;
}

export interface Package {
  id: number;
  name: string;
  description?: string;
  price?: number;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  service?: Service;
  items?: PackageItem[];
  agent_commission_percentage?: number;
  vendor_commission_percentage?: number;
  package_type?: 'one_time' | 'weekly' | 'monthly';
}

export interface CreatePackageRequest {
  service_id: number;
  name: string;
  description?: string;
  price?: number;
  features?: string[];
  nested_service_ids?: number[];
  agent_commission_percentage?: number;
  vendor_commission_percentage?: number;
  package_type?: 'one_time' | 'weekly' | 'monthly';
}

export interface UpdatePackageRequest {
  name?: string;
  description?: string;
  price?: number;
  features?: string[];
  nested_service_ids?: number[];
  agent_commission_percentage?: number;
  vendor_commission_percentage?: number;
  package_type?: 'one_time' | 'weekly' | 'monthly';
}

/* ==========================================================================
   PACKAGE API
   ========================================================================== */

export const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackages: builder.query<ServiceApiResponse<Package[]>, void>({
      query: () => '/packages',
      providesTags: ['Package'],
    }),
    getPackagesByService: builder.query<Package[], string | number>({
      query: (serviceId) => `/packages/service/${serviceId}`,
      providesTags: ['Package'],
    }),
    getPackageById: builder.query<ServiceApiResponse<Package>, string | number>({
      query: (id) => `/packages/${id}`,
      providesTags: ['Package'],
    }),
    createPackage: builder.mutation<ServiceApiResponse<Package>, CreatePackageRequest>({
      query: (data) => ({
        url: '/packages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Package'],
    }),
    updatePackage: builder.mutation<
      ServiceApiResponse<Package>,
      { id: string | number; data: UpdatePackageRequest }
    >({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Package'],
    }),
    deletePackage: builder.mutation<ServiceApiResponse<void>, string | number>({
      query: (id) => ({
        url: `/packages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Package'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllPackagesQuery,
  useGetPackagesByServiceQuery,
  useGetPackageByIdQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;
