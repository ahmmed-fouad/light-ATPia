import { useEffect, useState } from 'react';
import { getHomeData } from '../services/homeService';
import { useHomeStore } from '../stores/homeStore';

export function useHomeData() {
  const { homeData, setHomeData } = useHomeStore();
  const [loading, setLoading] = useState(!homeData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getHomeData()
      .then((data) => {
        if (mounted) setHomeData(data);
      })
      .catch((e) => {
        if (mounted) setError('Failed to load home data');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [setHomeData]);

  return { homeData, loading, error };
} 