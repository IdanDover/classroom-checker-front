import Button from "./Button";
import { FaUpload, FaScroll } from "react-icons/fa6";

function Footer() {
  //TODO: change the default option to mission according to the hour
  return (
    <footer>
      <div className="flex items-center justify-between px-3 py-3 space-x-4 font-semibold bg-red-500 md:justify-end dark:bg-red-600 ">
        <Button to={"upload"} disabled={false} type={"primary"}>
          <p className="text-xs text-stone-700">
            <FaUpload />
          </p>
        </Button>
        <Button to={"noon"} disabled={false} type={"primary"}>
          <p className="text-xs text-stone-700">
            <FaScroll />
          </p>
        </Button>
        {/* <Button to={"noon"} disabled={false} type={"primary"}>
          <p className="text-xs text-stone-700">פרופיל</p>
        </Button> */}
      </div>
    </footer>
  );
}
export default Footer;
