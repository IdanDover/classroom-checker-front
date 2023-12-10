import { useParams } from "react-router-dom";
import FloorOptions from "./FloorOptions";
import FloorsTable from "./FloorsTable";
import TasksTable from "./TasksTable";

type Props = {
  route: "noon" | "evening" | "tasks";
};

function Dashboard({ route }: Props) {
  const { floorNum } = useParams();

  const headline = route === "noon" ? "צהריים" : "ערב";

  if (route === "tasks") {
    return <TasksTable />;
  }

  if (!floorNum) {
    return (
      <div className="flex flex-col h-full">
        <FloorOptions time={route}></FloorOptions>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full my-2">
      <h2 className="px-3 py-1 font-serif text-center text-gray-700 underline text-md md:text-3xl md:py-3 xl:text-4xl xl:py-5 dark:text-gray-200">
        {headline}
      </h2>
      <div>
        <FloorsTable time={route} />
      </div>
      <div className="mt-auto">
        <FloorOptions time={route} />
      </div>
    </div>
  );
}

export default Dashboard;
