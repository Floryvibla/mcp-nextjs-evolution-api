import { apiEvo } from "../config";

export const evoSettings = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName: string;
}) => {
  return {
    getSettings: async () => {
      try {
        const api = apiEvo(`${baseURL}/settings`, apikey);
        const res = await api.get(`/find/${instanceName}`);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
    setSettings: async (data: any) => {
      try {
        const api = apiEvo(`${baseURL}/settings`, apikey);
        const res = await api.post(`/set/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
