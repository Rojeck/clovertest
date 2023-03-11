type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const useHttp = <T>() => {
  const request = async (
    url: string,
    method: HttpMethod = "GET",
    body: any = null,
    headers: { [key: string]: string } = { "Content-Type": "application/json" }
  ): Promise<T> => {
    const bodyJson = body ? JSON.stringify(body) : null;
    try {
      const response = await fetch(url, { method, body: bodyJson, headers });
      if (!response.ok) {
        console.log(response.status);
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }
      const result = (await response.json()) as T;
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return { request };
};

export default useHttp;
