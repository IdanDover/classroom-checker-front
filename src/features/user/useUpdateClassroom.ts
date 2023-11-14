import { useMutation, useQueryClient } from "@tanstack/react-query";
import toaster from "../../libs/toaster";
import { updateClassroom } from "../../services/apiUser";
function useUpdateClassroom() {
  const queryClient = useQueryClient();

  const { mutate: update } = useMutation({
    mutationFn: updateClassroom,
    onSuccess: () => {
      //   toaster.success("הכיתה הושלמה");
      queryClient.invalidateQueries({
        queryKey: ["floors", "noon"],
      });
      queryClient.invalidateQueries({
        queryKey: ["floors", "evening"],
      });
    },
    onError: (err) => toaster.error(err.message),
  });

  return { update };
}

export default useUpdateClassroom;
