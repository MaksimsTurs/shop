import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const useFetch = (url: string, deps?: any, loadingState: boolean = true) => {
  const [stateData, setData] = useState<any | undefined>();
  const [isLoading, setLoading] = useState<boolean>(loadingState);
  const [errorCode, setErrorCode] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (error) {
        const statusCode: number | undefined = (error as AxiosError).response
          ?.status;
        setErrorCode(statusCode);
      }

      setLoading(false);
    };

    fetcher();
  }, [deps]);

  return { stateData, isLoading, errorCode };
};

export default useFetch;
