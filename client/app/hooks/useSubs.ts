import { useEffect, useState } from 'react';

import { Sub } from '../types';
import { clientAxiosInstance } from '../utils/axios';

export const useSubs = () => {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSubs = async () => {
      try {
        const { data } = await clientAxiosInstance.get('/api/sub/myList');
        setSubs(data.subs);
      } catch (error) {
        console.error('Failed to get subs:', error);
        setSubs([]);
      } finally {
        setLoading(false);
      }
    };

    getSubs();
  }, []);

  return { subs, loading };
};
