import DataTable, { createTheme } from "react-data-table-component";
import Loader from "../../components/Loader";
import ServerError from "../../components/ServerError";
import useFloors from "./useFloors";
import { Classroom } from "../../models/classroom";
import { useParams } from "react-router-dom";
import EmptyView from "../../components/EmptyView";
import useUpdateClassroom from "./useUpdateClassroom";
import { useQueryClient } from "@tanstack/react-query";

type Props = { time: "noon" | "evening" };

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
    name: "כיתה",
    selector: (classroom: Classroom) => classroom.classNum,
  },
  {
    name: "הערות",
    selector: (classroom: Classroom) => classroom.comment,
  },
];

const FloorsTable = ({ time }: Props) => {
  const queryClient = useQueryClient();
  const { floorNum } = useParams();

  const appTheme = queryClient.getQueryData(["theme"]);

  const {
    isLoadingFloors,
    floors,
    error: errorFetchingFloors,
  } = useFloors(time);

  const { update } = useUpdateClassroom();

  if (errorFetchingFloors) {
    return <ServerError />;
  }

  if (isLoadingFloors) {
    return <Loader variation="area" />;
  }

  if (!floors?.data.floorNumbers.includes(floorNum)) {
    <EmptyView linkTo={"home"} linkText={"חזרה לבית"} />;
  }

  const handleChange = ({ selectedRows }: any) => {
    if (selectedRows.length === 0) {
      return;
    }

    selectedRows
      .filter((classroom: Classroom) => !classroom.completed)
      .forEach((classroom: Classroom) => {
        classroom.completed = !classroom.completed;
        update(classroom);
      });
  };

  return (
    <DataTable
      columns={columns}
      data={floors?.data.floors[`floor-${floorNum}`]}
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

export default FloorsTable;
