import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "../../services/apiUser";

function useClassrooms(query?: "noon" | "evening") {
  const {
    isLoading: isLoadingClassrooms,
    data: classrooms,
    error,
  } = useQuery({
    queryKey: ["tasks", query],
    queryFn: () => getAllTasks(query),
  });

  return { isLoadingClassrooms, error, classrooms };
}

export default useClassrooms;
