import { baseApi } from '@/redux/api/baseApi';

export interface CompanyBranding {
  id?: number;
  companyName?: string;
  logoUrl?: string;
  footerLogoUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  cityLocation?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  whatsappNumber?: string;
  metaTitle?: string;
  metaDescription?: string;
  footerDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandingApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export const companyBrandingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyBranding: builder.query<BrandingApiResponse<CompanyBranding>, void>({
      query: () => '/company-branding',
      providesTags: ['Branding'],
    }),
    saveCompanyBranding: builder.mutation<BrandingApiResponse<CompanyBranding>, Partial<CompanyBranding>>({
      query: (data) => ({
        url: '/company-branding',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Branding'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCompanyBrandingQuery,
  useSaveCompanyBrandingMutation,
} = companyBrandingApi;
