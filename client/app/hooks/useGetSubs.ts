import { useCallback, useEffect, useState } from 'react';

import { Sub } from '@/app/types';

import { clientAxiosInstance } from '../utils/axios';

interface GetSubsOptions {
  subsOnly?: boolean;
}
interface UseGetSubsReturn {
  subs: Sub[];
  loading: boolean;
  error: Error | null;
  getMySubs: (options?: GetSubsOptions) => void;
}

export const useGetSubs = (
  initialOptions: GetSubsOptions = { subsOnly: false }
): UseGetSubsReturn => {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getMySubs = useCallback(async (options: GetSubsOptions = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await clientAxiosInstance.get<Sub[]>('/api/sub/myList', {
        params: {
          subsOnly: options.subsOnly || false,
        },
      });
      setSubs(data);
    } catch (err) {
      console.error('Failed to fetch user subs', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMySubs(initialOptions);
  }, [getMySubs]);

  return { subs, loading, error, getMySubs };
};
