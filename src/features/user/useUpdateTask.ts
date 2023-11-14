import { useMutation, useQueryClient } from "@tanstack/react-query";
import toaster from "../../libs/toaster";
import { updateTask } from "../../services/apiUser";
function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate: update } = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      //   toaster.success("הכיתה הושלמה");
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: (err) => toaster.error(err.message),
  });

  return { update };
}

export default useUpdateTask;
