// services-chat.ts
import { apiEvo } from "../config";

export const evoChat = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName: string;
}) => {
  const api = apiEvo(`${baseURL}/chat`, apikey);

  return {
    archiveChat: async (data: any) => {
      try {
        const res = await api.post(`/archiveChat/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    findChats: async (data: any = {}) => {
      try {
        const res = await api.post(`/findChats/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    findContacts: async (data: any = {}) => {
      try {
        const res = await api.post(`/findContacts/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    findMessages: async (data: any) => {
      try {
        const res = await api.post(`/findMessages/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    markMessageAsRead: async (data: any) => {
      try {
        const res = await api.post(`/markMessageAsRead/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    updateProfileName: async (data: any) => {
      try {
        const res = await api.post(`/updateProfileName/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    updateProfilePicture: async (data: any) => {
      try {
        const res = await api.post(
          `/updateProfilePicture/${instanceName}`,
          data,
        );
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    updateProfileStatus: async (data: any) => {
      try {
        const res = await api.post(
          `/updateProfileStatus/${instanceName}`,
          data,
        );
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    checkWhatsAppNumbers: async (data: any) => {
      try {
        const res = await api.post(`/whatsappNumbers/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
