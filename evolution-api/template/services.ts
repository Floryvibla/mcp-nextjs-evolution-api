import { apiEvo } from "../config";

export const evoTemplate = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName: string;
}) => {
  const api = apiEvo(`${baseURL}/template`, apikey);

  return {
    createTemplate: async (data: any) => {
      try {
        const res = await api.post(`/createTemplate/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
    deleteTemplate: async (templateName: string) => {
      try {
        const res = await api.delete(
          `/deleteTemplate/${instanceName}?name=${templateName}`,
        );
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
    editTemplate: async (data: any) => {
      try {
        const res = await api.post(`/editTemplate/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
    findTemplates: async () => {
      try {
        const res = await api.get(`/findTemplates/${instanceName}`);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
