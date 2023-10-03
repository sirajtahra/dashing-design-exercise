import { useState, useEffect, useCallback } from "react";

function useFetch<T>(url: string) {
  const [responseJSON, setResponeJSON] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchRequest = useCallback(
    async (url: string, options: RequestInit) => {
      setIsLoading(true);
      try {
        const response = await fetch(url, options).then((response) =>
          response.json()
        );
        setResponeJSON(response);
        setError(null);
      } catch (error) {
        setError(error);
        setResponeJSON(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchRequest(url, { signal });

    return () => {
      controller.abort();
    };
  }, [fetchRequest, url]);

  return {
    responseJSON,
    isLoading,
    error,
  };
}

export default useFetch;
