import FloorOptions from "../features/user/FloorOptions";

function Home() {
  return (
    <div>
      <p className="block p-2 mb-2 text-sm font-bold text-right text-gray-700 dark:text-gray-100">
        כיתות צהריים
      </p>
      <FloorOptions time={"noon"} />
      <p className="block p-2 mb-2 text-sm font-bold text-right text-gray-700 dark:text-gray-100">
        כיתות ערב
      </p>
      <FloorOptions time={"evening"} />
    </div>
  );
}

export default Home;
