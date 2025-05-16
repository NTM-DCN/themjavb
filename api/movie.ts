import { axiosInstance } from "@/shared/utils/ApiUtils";

const apiUrl = "site";

const domain_id = process.env.NEXT_PUBLIC_DOMAIN_ID;

export interface IModeRes {
    status: boolean;
    message: string;
    data: IModeItem | IModeItem[]; 
}

export interface IModeItem {
    id: number;
    image_url: string;
    name: string;
    time: string;
    categories: [];
    content: string;
    description: string;
    meta_description?: string;
    meta_title?: string;
    canonical?: string;
    video: string;
    created_at: string;
}

export const movieApi = {
    getMovies: async (params?: { limit?: number; page?: number; sort_name?: string; sort_by?: string; domain_id?: number; }) => {
        const defaultParams = {
            limit: 12,
            page: 1,
            sort_name: "desc",
            sort_by: "created_at",
            domain_id: domain_id,
            ...params,
        };

        const response = await axiosInstance.get(`${apiUrl}/posts`, {
            params: defaultParams,
        });
        return response.data;
    },

    getMoviesByCategory: async (params?: { page?: number; limit?: number; type?: string; domain_id?: number; slug?: string; }) => {
        const defaultParams = {
            type: 'post',
            slug: "",
            domain_id: domain_id,
            page: 1,
            limit: 12,
            ...params,
        };
        const response = await axiosInstance.get(`${apiUrl}/category`, {
            params: defaultParams,
        });
        return response.data;
    },
    
    getDetail: async (params?: {slug?: string;}) => {
        const defaultParams = {
            slug: params?.slug,
        };
        const response = await axiosInstance.get<IModeRes>(`${apiUrl}/post`, {
            params: defaultParams,
        });
        
        return response.data;
    },

    getCategories: async (params?: { type?: string; domain_id?: number; slug?: string }) => {
        const defaultParams = {
            type: 'post',
            domain_id: domain_id,
            slug: '',
            is_active: 1,
            ...params,
        };

        const response = await axiosInstance.get(`${apiUrl}/category`, {
            params: defaultParams,
        });
        return response.data;
    },
}
