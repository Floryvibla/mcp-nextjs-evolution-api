// services-instance.ts
import { apiEvo } from "../config";
import {
  ConnectInstanceResponseError,
  ConnectInstanceResponseSuccess,
  // Certifique-se de adicionar as outras tipagens no seu arquivo types.ts se desejar
} from "./types";

export const evoInstance = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName?: string;
}) => {
  const api = apiEvo(`${baseURL}/instance`, apikey);

  return {
    createInstance: async (data: any) => {
      try {
        const res = await api.post(`/create`, { instanceName, ...data });
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    connectInstance: async () => {
      try {
        const res = await api.get(`/connect/${instanceName}`);
        return res.data as ConnectInstanceResponseSuccess;
      } catch (error: any) {
        return (error.response?.data ||
          error.data) as ConnectInstanceResponseError;
      }
    },

    fetchInstances: async () => {
      try {
        const res = await api.get(`/fetchInstances`);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    logoutInstance: async () => {
      try {
        const res = await api.delete(`/logout/${instanceName}`);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    deleteInstance: async () => {
      try {
        const res = await api.delete(`/delete/${instanceName}`);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    restartInstance: async () => {
      try {
        const res = await api.put(`/restart/${instanceName}`);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    connectionState: async () => {
      try {
        const res = await api.get(`/connectionState/${instanceName}`);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
