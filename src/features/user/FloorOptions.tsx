import Button from "../../components/Button";
import Loader from "../../components/Loader";
import ServerError from "../../components/ServerError";
import useFloors from "./useFloors";

type Props = {
  time: "noon" | "evening";
};

const FloorOptions = ({ time }: Props) => {
  const {
    isLoadingFloors,
    floors,
    error: errorFetchingFloors,
  } = useFloors(time);

  if (errorFetchingFloors) {
    return <ServerError />;
  }

  if (isLoadingFloors) {
    return <Loader variation="area" />;
  }

  const { floorNumbers } = floors?.data;

  return (
    <div className="flex items-center justify-between flex-1 px-3 py-3 space-x-4 font-semibold">
      {floorNumbers.map((num: number) => (
        <Button
          key={`floor-${num}`}
          to={`/${time}/${num}`}
          disabled={false}
          type={"small"}
        >
          <p>קומה-{num}</p>
        </Button>
      ))}
    </div>
  );
};

export default FloorOptions;
