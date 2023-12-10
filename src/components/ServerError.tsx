import { FaArrowRight } from "react-icons/fa6";
import LinkButton from "./LinkButton";

function ServerError() {
  return (
    <div className="flex flex-col items-center justify-center px-3 py-5 mx-2 my-3">
      <h1 className="px-3 py-3 font-serif text-3xl text-amber-500 text-md dark:text-amber-300">
        מצטערים, נראה שיש בעיה בשרתים. אנא נסו עוד מספר דקות
      </h1>
      <LinkButton to="/home" target={undefined}>
        <FaArrowRight />
        <span>back home</span>
      </LinkButton>
    </div>
  );
}

export default ServerError;
