import { useCallback, useEffect, useState } from 'react';

export default function useFetch(fetchFn, dependencyKey = '') {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const executeFetch = useCallback(async (isMounted) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const responseData = await fetchFn();
      
      if (isMounted) {
        setData(responseData);
      }
    } catch (err) {
      if (isMounted) {
        setError(err?.message || 'An unexpected error occurred while fetching data.');
        setData(null);
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  }, [fetchFn]);

  useEffect(() => {
    let isMounted = true;
    
    executeFetch(isMounted);
    
    return () => {
      isMounted = false;
    };
  }, [executeFetch, dependencyKey, retryTrigger]);

  const retry = useCallback(() => {
    setRetryTrigger((prev) => prev + 1);
  }, []);

  return { data, isLoading, error, retry };
}
