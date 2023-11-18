//@ts-nocheck

import useTheme from "../hooks/useTheme";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";
import Button from "./Button";

function Header() {
  const [theme, onClick] = useTheme();

  return (
    <header>
      <div className="flex items-center justify-between px-3 py-3 space-x-4 font-semibold bg-red-500 md:justify-end dark:bg-red-600 ">
        <Button onClick={onClick} disabled={false} type={"round"}>
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        <Button to={"tasks"} disabled={false} type={"primary"}>
          <p className="text-xs text-stone-700">משימות</p>
        </Button>
        <Button to={"evening"} disabled={false} type={"primary"}>
          <p className="text-xs text-stone-700">ערב</p>
        </Button>
        <Button to={"noon"} disabled={false} type={"primary"}>
          <p className="text-xs text-stone-700">צהריים</p>
        </Button>
      </div>
    </header>
  );
}

export default Header;
