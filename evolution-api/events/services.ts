import { apiEvo } from "../config";

export const evoEvents = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName: string;
}) => {
  return {
    getWebhook: async () => {
      try {
        const api = apiEvo(`${baseURL}/webhook`, apikey);
        const res = await api.get(`/find/${instanceName}`);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
    setWebhook: async (data: any) => {
      try {
        const api = apiEvo(`${baseURL}/webhook`, apikey);
        const res = await api.post(`/set/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
    setWebSocket: async (data: any) => {
      try {
        const api = apiEvo(`${baseURL}/websocket`, apikey);
        const res = await api.post(`/set/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
