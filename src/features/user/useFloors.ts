import { useQuery } from "@tanstack/react-query";
import { getFloors } from "../../services/apiUser";

function useFloors(query?: "noon" | "evening") {
  const {
    isLoading: isLoadingFloors,
    data: floors,
    error,
  } = useQuery({
    queryKey: ["floors", query],
    queryFn: () => getFloors(query),
  });

  return { isLoadingFloors, error, floors };
}

export default useFloors;
