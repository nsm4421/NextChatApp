import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { title: string };
type ResponseType = Id<"groups"> | null;
type Status = "initial" | "loading" | "success" | "error";

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useCreateGroup = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [status, setStatus] = useState<Status>("initial");
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isLoading = useMemo(() => status === "loading", [status]);
  const isDone = useMemo(
    () => status === "success" || status === "error",
    [status]
  );
  const muation = useMutation(api.features.groups.create);
  const mutate = useCallback(
    async (req: RequestType, options?: Options) => {
      try {
        // initialize states
        setData(null);
        setStatus("loading");
        // handle reqeust
        const res = await muation(req);
        // handle call back
        options?.onSuccess?.(res);
        setData(res);
      } catch (e) {
        // handle callback
        options?.onError?.(e as Error);
        setStatus("error");
        // throw error if throwError option given
        if (options?.throwError) {
          throw e;
        }
      } finally {
        options?.onSettled?.();
      }
    },
    [muation]
  );
  return {
    mutate,
    data,
    isSuccess,
    isLoading,
    isError,
    isDone,
  };
};
