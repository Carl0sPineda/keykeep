import toast from "react-hot-toast";
import { useAddKey } from "../hooks/key.mutation";
import { FormData } from "../interfaces/key.interface";
import { useForm } from "react-hook-form";

const AddKey = () => {
  const addKeyMutation = useAddKey();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await addKeyMutation.mutateAsync(data);
      toast.success("Dato agregado con éxito!");
      reset();
    } catch (error) {
      toast.error(`Error ${error} al agregar`);
    }
  };

  return (
    <div className="flex lg:w-2/3 w-full mt-6 md:justify-start justify-center items-end max-w-7xl mx-auto">
      <form className="flex w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
          <input
            type="text"
            id="website"
            className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-purple-900 focus:bg-transparent focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="instagram.com"
            autoComplete="off"
            {...register("website")}
          />
        </div>
        <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
          <input
            type="text"
            id="username"
            required
            className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-purple-900 focus:bg-transparent focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="@username"
            autoComplete="off"
            {...register("username")}
          />
        </div>
        <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4">
          <input
            type="password"
            id="password"
            required
            className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-purple-900 focus:bg-transparent focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="********"
            autoComplete="off"
            {...register("password")}
          />
        </div>
        <button
          type="submit"
          className="inline-flex font-bold text-gray-100 bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg"
        >
          Agregar
        </button>
      </form>
    </div>
  );
};

export default AddKey;
