import { useForm } from "react-hook-form";
import useUploadFiles from "./useUploadFiles";

function FilesForm() {
  const { handleSubmit, setValue } = useForm();
  const { upload, isPending } = useUploadFiles();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("noon", data.noon[0]);
    formData.append("evening", data.evening[0]);

    upload(formData);
  };

  return (
    <div className="max-w-md p-6 mx-auto mt-10 bg-gray-200 rounded-md dark:bg-gray-700">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="noon"
          >
            צהריים
          </label>
          <input
            type="file"
            onChange={(e) => setValue("noon", e.target.files)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="evening"
          >
            ערב
          </label>
          <input
            type="file"
            onChange={(e) => setValue("evening", e.target.files)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded dark:bg-red-600 hover:bg-red-700 sm:w-auto"
          disabled={isPending}
        >
          עדכן
        </button>
      </form>
    </div>
  );
}

export default FilesForm;
