import { apiEvo } from "../config";

export const evoProxy = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName: string;
}) => {
  return {
    getProxy: async () => {
      try {
        const api = apiEvo(`${baseURL}/proxy`, apikey);
        const res = await api.get(`/find/${instanceName}`);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
    setProxy: async (data: any) => {
      try {
        const api = apiEvo(`${baseURL}/proxy`, apikey);
        const res = await api.post(`/set/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
