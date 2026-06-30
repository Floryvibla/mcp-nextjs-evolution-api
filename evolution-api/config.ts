import axios from "axios";

export const BASE_URL = process.env.EVOLUTION_API_URL;
export const API_KEY = process.env.EVOLUTION_API_KEY;
export const INSTANCE_NAME = process.env.EVOLUTION_API_INSTANCE_NAME;

export const apiEvo = (baseURL: string, apikey: string) =>
  axios.create({
    baseURL,
    headers: {
      apikey,
    },
    timeout: 30000,
  });
