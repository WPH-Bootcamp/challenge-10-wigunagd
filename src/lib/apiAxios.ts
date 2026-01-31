import axios from "axios";

/* const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL; */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiAxios = axios.create({
    baseURL: API_BASE_URL ?? 'https://be-blg-production.up.railway.app'
});