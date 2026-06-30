// services-message.ts
import { apiEvo } from "../config";

export const evoMessage = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName: string;
}) => {
  const api = apiEvo(`${baseURL}/message`, apikey);

  return {
    sendText: async (data: any) => {
      try {
        const res = await api.post(`/sendText/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    sendMedia: async (data: any) => {
      try {
        const res = await api.post(`/sendMedia/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    sendButtons: async (data: any) => {
      try {
        const res = await api.post(`/sendButtons/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    sendContact: async (data: any) => {
      try {
        const res = await api.post(`/sendContact/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    sendList: async (data: any) => {
      try {
        const res = await api.post(`/sendList/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    sendLocation: async (data: any) => {
      try {
        const res = await api.post(`/sendLocation/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    sendPoll: async (data: any) => {
      try {
        const res = await api.post(`/sendPoll/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    sendReaction: async (data: any) => {
      try {
        const res = await api.post(`/sendReaction/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    sendTemplateMessage: async (data: any) => {
      try {
        const res = await api.post(`/sendTemplate/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
