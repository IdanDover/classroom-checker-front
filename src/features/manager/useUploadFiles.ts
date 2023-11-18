import { useMutation, useQueryClient } from "@tanstack/react-query";
import toaster from "../../libs/toaster";
import { uploadFiles } from "../../services/apiManager";

function useUploadFiles() {
  const queryClient = useQueryClient();

  const { mutate: upload, isPending } = useMutation({
    mutationFn: uploadFiles,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["floors", "noon"],
      });
      queryClient.invalidateQueries({
        queryKey: ["floors", "evening"],
      });
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (err) => toaster.error(err.message),
  });

  return { upload, isPending };
}

export default useUploadFiles;
