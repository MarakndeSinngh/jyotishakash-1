import { useState, useEffect, useCallback } from 'react';
import { contentEngine, HomepageContent, AcademyContent } from '../services/contentEngine';

type ContentType = 'homepage' | 'academy';

interface UseContentEngineOptions {
  type?: ContentType;
  mentorId?: string;
}

export function useContentEngine(options?: UseContentEngineOptions) {
  const type = options?.type || 'homepage';
  const mentorId = options?.mentorId;

  const [data, setData] = useState<HomepageContent | AcademyContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let result;
      if (type === 'academy' && mentorId) {
        result = await contentEngine.getAcademyContent(mentorId);
      } else {
        result = await contentEngine.getHomepageContent();
      }
      setData(result);
    } catch (err: any) {
      console.error('Error in useContentEngine:', err);
      setError(err?.message || 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  }, [type, mentorId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh
  };
}
