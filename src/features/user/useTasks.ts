import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "../../services/apiUser";

function useTasks() {
  const {
    isLoading: isLoadingTasks,
    data: tasks,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getAllTasks(),
  });

  return { isLoadingTasks, error, tasks };
}

export default useTasks;
