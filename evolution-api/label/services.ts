import { apiEvo } from "../config";

export const evoLabel = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName: string;
}) => {
  return {
    getLabels: async () => {
      try {
        const api = apiEvo(`${baseURL}/label`, apikey);
        const res = await api.get(`/find/${instanceName}`);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
    handleLabel: async (data: any) => {
      try {
        const api = apiEvo(`${baseURL}/label`, apikey);
        const res = await api.post(`/handle/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
