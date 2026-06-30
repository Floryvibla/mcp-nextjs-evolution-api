// services-group.ts
import { apiEvo } from "../config";

export const evoGroup = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName: string;
}) => {
  const api = apiEvo(`${baseURL}/group`, apikey);

  return {
    createGroup: async (data: any) => {
      try {
        const res = await api.post(`/createGroup/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    getGroupInfo: async (groupJid: string) => {
      try {
        // A busca de informações de grupo geralmente é via GET com query param
        const res = await api.get(
          `/findGroupInfos/${instanceName}?groupJid=${groupJid}`,
        );
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    getParticipants: async (groupJid: string) => {
      try {
        // Busca os participantes usando query param
        const res = await api.get(
          `/findParticipants/${instanceName}?groupJid=${groupJid}`,
        );
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },

    updateParticipant: async (data: any) => {
      try {
        const res = await api.post(`/updateParticipant/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
