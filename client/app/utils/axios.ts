import axios, { AxiosInstance } from "axios";

const clientAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "cache-control": "public, max-age=3600, s-maxage=300",
    "Content-Type": "application/json",
  },
});

const serverAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "cache-control": "public, max-age=3600, s-maxage=300",
    "Content-Type": "application/json",
  },
});

export { clientAxiosInstance, serverAxiosInstance };
