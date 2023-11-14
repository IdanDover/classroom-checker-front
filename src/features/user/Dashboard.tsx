import { useParams } from "react-router-dom";
import FloorOptions from "./FloorOptions";
import FloorsTable from "./FloorsTable";
import TasksTable from "./TasksTable";

type Props = {
  route: "noon" | "evening" | "tasks";
};

function Dashboard({ route }: Props) {
  const { floorNum } = useParams();

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
    <div className="flex flex-col h-full py-3 space-y-2">
      <div className="">
        <FloorsTable time={route} />
      </div>
      <div className="mt-auto">
        <FloorOptions time={route} />
      </div>
    </div>
  );
}

export default Dashboard;
