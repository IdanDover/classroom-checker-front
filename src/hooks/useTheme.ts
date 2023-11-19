import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function useTheme() {
  const queryClient = useQueryClient();

  const userTheme =
    localStorage.getItem("theme") === `"dark"` ? "dark" : "light";

  const [theme, setTheme] = useState<Theme>(userTheme);

  useEffect(() => {
    theme === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");

    queryClient.setQueryData(["theme"], theme);
    queryClient.invalidateQueries({
      queryKey: ["theme"],
      refetchType: "active",
    });
  }, [theme]);

  const handleSwitchTheme = () =>
    setTheme((prevTheme: Theme) => {
      if (prevTheme === "dark") {
        localStorage.setItem("theme", JSON.stringify("light"));
        return "light";
      } else {
        localStorage.setItem("theme", JSON.stringify("dark"));
        return "dark";
      }
    });

  return [theme, handleSwitchTheme];
}

export default useTheme;
