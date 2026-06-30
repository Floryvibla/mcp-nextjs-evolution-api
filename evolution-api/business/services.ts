import { apiEvo } from "../config";

export const evoBusiness = ({
  apikey,
  baseURL,
  instanceName,
}: {
  baseURL: string;
  apikey: string;
  instanceName: string;
}) => {
  const api = apiEvo(`${baseURL}/chat`, apikey); // Na Evolution, as buscas de catálogo geralmente ficam atreladas ao chat/business

  return {
    getCatalog: async (data: any) => {
      try {
        const res = await api.post(`/fetchCatalog/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
    getCollections: async (data: any) => {
      try {
        const res = await api.post(`/fetchCollections/${instanceName}`, data);
        return res.data;
      } catch (error: any) {
        return error.response?.data || error.data;
      }
    },
  };
};
