import axios, { AxiosInstance } from 'axios';

const clientAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'cache-control': 'public, max-age=3600, s-maxage=300',
  },
});

const serverAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4040',
  headers: {
    'cache-control': 'public, max-age=3600, s-maxage=300',
  },
});

export { clientAxiosInstance, serverAxiosInstance };
