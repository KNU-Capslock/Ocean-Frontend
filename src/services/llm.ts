import axios from "axios";

export type LLMPayload = {
  json: any;
  request: string;
};

type LLMReturnType = {
  content: string;
  item: number;
};

export const llm = async (data: LLMPayload) => {
  const response = await axios.post<LLMReturnType>(
    import.meta.env.VITE_LLM_URL + "/process",
    data
  );
  return response.data;
};
