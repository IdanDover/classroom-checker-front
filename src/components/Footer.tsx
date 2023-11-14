import Button from "./Button";

function Footer() {
  //TODO: change the default option to mission according to the hour
  return (
    <footer>
      <div className="flex items-center justify-between px-3 py-3 space-x-4 font-semibold md:justify-end bg-rose-500 dark:bg-rose-600 ">
        <Button to={"update"} disabled={false} type={"primary"}>
          <p className="text-xs text-stone-700">עדכון</p>
        </Button>
        <Button to={"noon"} disabled={false} type={"primary"}>
          <p className="text-xs text-stone-700">משימות</p>
        </Button>
        {/* <Button to={"noon"} disabled={false} type={"primary"}>
          <p className="text-xs text-stone-700">פרופיל</p>
        </Button> */}
      </div>
    </footer>
  );
}
export default Footer;
