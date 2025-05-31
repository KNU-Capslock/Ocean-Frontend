import { llm, type LLMPayload } from "@services/llm";
import { useMutation } from "@tanstack/react-query";

export const useLLM = () => {
  const { mutate } = useMutation({
    mutationFn: (data: LLMPayload) => llm(data),
  });
  return { mutate };
};
