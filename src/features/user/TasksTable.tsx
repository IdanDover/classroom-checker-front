import DataTable, { createTheme } from "react-data-table-component";
import Loader from "../../components/Loader";
import ServerError from "../../components/ServerError";
import EmptyView from "../../components/EmptyView";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useTasks from "./useTasks";
import { Task } from "../../models/Task";
import useUpdateTask from "./useUpdateTask";

type Props = {};

const ExpandedComponent = ({ data }: any) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

createTheme(
  "solarized",
  {
    text: {
      primary: "#f7f7f7",
      secondary: "#fffafa",
    },
    background: {
      default: "#002b36",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const customStyles = {
  rows: {
    style: {
      minHeight: "5vh",
      maxHeight: "15vh",
      minWidth: "50vw",
      maxWidth: "80vw",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      backgroundColor: "#df4e4e",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
    },
  },
};

const columns = [
  {
    name: "מספר",
    selector: (task: Task) => task.taskNum,
  },
  {
    name: "משימה",
    selector: (task: Task) => task.description,
  },
];

const TasksTable = ({}: Props) => {
  const { update } = useUpdateTask();
  const queryClient = useQueryClient();

  const { data: appTheme } = useQuery({
    queryKey: ["theme"],
    queryFn: () => queryClient.getQueryData(["theme"]),
  });

  const { isLoadingTasks, tasks, error: errorFetchingFloors } = useTasks();

  if (errorFetchingFloors) {
    return <ServerError />;
  }

  if (isLoadingTasks) {
    return <Loader variation="area" />;
  }

  if (tasks?.data.length === 0) {
    <EmptyView linkTo={"home"} linkText={"חזרה לבית"} />;
  }

  const handleChange = ({ selectedRows }: any) => {
    if (selectedRows.length === 0) {
      return;
    }

    selectedRows
      .filter((task: Task) => !task.completed)
      .forEach((task: Task) => {
        task.completed = !task.completed;
        update(task);
      });
  };

  return (
    <DataTable
      columns={columns}
      data={tasks?.data}
      expandableRows
      selectableRows
      selectableRowDisabled={(classroom) => classroom.completed}
      expandableRowsComponent={ExpandedComponent}
      onSelectedRowsChange={handleChange}
      customStyles={customStyles}
      theme={appTheme === "dark" ? "solarized" : ""}
    />
  );
};

export default TasksTable;
