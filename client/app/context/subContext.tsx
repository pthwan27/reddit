import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Sub } from '../types';
import { clientAxiosInstance } from '../utils/axios';

interface SubContextType {
  subs: Sub[];
  loading: boolean;
  getMySubs: () => Promise<void>;
}

const SubContext = createContext<SubContextType | undefined>(undefined);

export const SubProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);

  const getMySubs = useCallback(async () => {
    try {
      const { data } = await clientAxiosInstance.get('/api/sub/myList');
      setSubs(data.subs);
    } catch (error) {
      console.error('Failed to get subs:', error);
      setSubs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getMySubs();
  }, [getMySubs]);

  const value: SubContextType = { subs, loading, getMySubs };

  return <SubContext.Provider value={value}>{children}</SubContext.Provider>;
};

export const useSubs = (): SubContextType => {
  const context = useContext(SubContext);
  if (context === undefined) {
    throw new Error('useSubs must be used within an AuthProvider');
  }
  return context;
};

export default SubProvider;
