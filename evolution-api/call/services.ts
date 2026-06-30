import { apiEvo } from "../config";

export const evoCall = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName: string;
}) => {
  return {
    offerCall: async (data: any) => {
      try {
        const api = apiEvo(`${baseURL}/chat`, apikey);
        const res = await api.post(`/sendCall/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
