import DataTable, {
  createTheme,
  TableStyles,
} from "react-data-table-component";
import Loader from "../../components/Loader";
import ServerError from "../../components/ServerError";
import useFloors from "./useFloors";
import { Classroom } from "../../models/classroom";
import { useParams } from "react-router-dom";
import EmptyView from "../../components/EmptyView";
import useUpdateClassroom from "./useUpdateClassroom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaArrowsRotate } from "react-icons/fa6";

type Props = { time: "noon" | "evening" };

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

const customStyles: TableStyles = {
  table: {
    style: { direction: "rtl" },
  },
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
  expanderRow: {
    style: {
      minHeight: "5vh",
      maxHeight: "15vh",
      minWidth: "50vw",
      maxWidth: "80vw",
    },
  },
  expanderButton: {
    style: {
      backgroundColor: "transparent",
      borderRadius: "2px",
      transition: "0.25s",
      height: "100%",
      width: "100%",
      "&:hover:enabled": {
        cursor: "pointer",
      },
      "&:hover:not(:disabled)": {
        cursor: "pointer",
      },
      "&:focus": {
        outline: "none",
      },
      svg: {
        margin: "auto",
        transform: "rotate(180deg)",
      },
    },
  },
};

const columns = [
  {
    name: "כיתה",
    selector: (classroom: any) => classroom.classNum,
  },
  {
    name: "סט",
    selector: (classroom: any) => classroom.courseSet,
  },
  {
    name: "החלפה",
    selector: (classroom: any) =>
      classroom.switchSet ? (
        <FaArrowsRotate className={"text-green-500 dark:text-green-600"} />
      ) : (
        ""
      ),
  },
];

const ExpandedComponent = ({ data }: any) => (
  <p className="px-2 overflow-hidden text-xs text-right md:text-base">
    {data.comment}
  </p>
);

function FloorsTable({ time }: Props) {
  const oldTime = time === "evening" ? "noon" : "old";
  const queryClient = useQueryClient();
  const { floorNum } = useParams();

  const { data: appTheme } = useQuery({
    queryKey: ["theme"],
    queryFn: () => queryClient.getQueryData(["theme"]),
  });

  const {
    isLoadingFloors: isLoadingOlderFloors,
    floors: oldFloors,
    error: errorFetchingOldFloors,
  } = useFloors(oldTime);

  const {
    isLoadingFloors,
    floors,
    error: errorFetchingFloors,
  } = useFloors(time);

  const { update } = useUpdateClassroom();

  if (errorFetchingFloors || errorFetchingOldFloors) {
    return <ServerError />;
  }

  if (isLoadingFloors || isLoadingOlderFloors) {
    return <Loader variation="area" />;
  }

  if (!floors?.data.floorNumbers.includes(floorNum)) {
    return <EmptyView linkTo={"home"} linkText={"חזרה לבית"} />;
  }

  const oldFloor = oldFloors?.data.floors[`floor-${floorNum}`];
  const floor = floors?.data.floors[`floor-${floorNum}`];
  const data = floor.map((classroom: Classroom, i: number) => {
    let switchSet = false;

    if (oldFloor !== undefined) {
      switchSet = classroom.courseSet !== oldFloor[i].courseSet;
    }
    return { ...classroom, switchSet };
  });

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
      data={data}
      expandableRows
      selectableRows
      selectableRowDisabled={(classroom) => classroom.completed}
      expandableRowsComponent={ExpandedComponent}
      onSelectedRowsChange={handleChange}
      customStyles={customStyles}
      theme={appTheme === "dark" ? "solarized" : ""}
    />
  );
}

export default FloorsTable;
