import superagent from "superagent";

type Method = "get" | "post" | "put" | "patch" | "delete";

const baseUrl = "https://979siaxifj.execute-api.eu-west-1.amazonaws.com/api";

export const request = async (
  method: Method,
  url: string,
  data: Record<string, unknown> | null = null
): Promise<unknown> => {
  const agent = superagent.agent();

  let promise = agent[method](baseUrl + url);

  if (["post", "put", "patch"].includes(method) && data) {
    promise = promise.send(data);
  }

  try {
    const { body } = await promise;
    return body;
  } catch (error) {
    throw error;
  }
};
