import { axiosInstance } from "@/shared/utils/ApiUtils";

const apiUrl = "site";

const domain_id = process.env.NEXT_PUBLIC_DOMAIN_ID;

export interface IModeRes {
    status: boolean;
    message: string;
    data: any[];
}

export const settingApi = {
    getSettings: async (params?: { domain_id?: number; }) => {
        try {
            const defaultParams = {
                domain_id: domain_id,
                ...params,
            };

            const response = await axiosInstance.get(`${apiUrl}/settings`, {
                params: defaultParams,
            });
            if (response.status) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    },
}
