import { useEffect, useState } from 'react';

import { clientAxiosInstance } from '../utils/axios';

interface LinkMetadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
}

interface UseGetLinkMetadataResult {
  metadata: LinkMetadata | null;
  loading: boolean;
  error: boolean;
}

export const useGetLinkMetadata = (url?: string): UseGetLinkMetadataResult => {
  const [metadata, setMetadata] = useState<LinkMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);
    setMetadata(null);

    const getMetadata = async () => {
      try {
        const { data } = await clientAxiosInstance.get<LinkMetadata>(
          `/api/linkPreview?url=${encodeURIComponent(url)}`
        );

        setMetadata(data);
      } catch (err) {
        console.error('Link metadata fetch error:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMetadata();
  }, [url]);

  return { metadata, loading, error };
};
