import { useCallback, useEffect, useState } from 'react';

import { Sub } from '@/app/types';

import { clientAxiosInstance } from '../utils/axios';

interface UseGetSubsReturn {
  subs: Sub[];
  loading: boolean;
  error: Error | null;
  getMySubs: () => void;
}

export const useGetSubs = (): UseGetSubsReturn => {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getMySubs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await clientAxiosInstance.get<Sub[]>('/api/sub/myList');
      setSubs(data);
    } catch (err) {
      console.error('Failed to fetch user subs', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMySubs();
  }, [getMySubs]);

  return { subs, loading, error, getMySubs };
};
