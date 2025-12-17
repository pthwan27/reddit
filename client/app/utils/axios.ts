import axios, { AxiosInstance } from 'axios';

const clientAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'cache-control': 'public, max-age=3600, s-maxage=300',
  },
});

const serverAxiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:4000',
  headers: {
    'cache-control': 'public, max-age=3600, s-maxage=300',
  },
});

clientAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined' && window.location.href !== '/login')
        window.location.href = '/login';
    }
  }
);

export { clientAxiosInstance, serverAxiosInstance };
