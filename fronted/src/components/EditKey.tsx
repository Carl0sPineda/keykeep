import { useEffect, useRef, useState } from "react";
import { usePutkey } from "../hooks/key.mutation";
import { useForm } from "react-hook-form";
import { Key } from "../interfaces/key.interface";
import toast from "react-hot-toast";

interface EditProps {
  keyd: Key;
  onEditSuccess: () => void;
}

const EditKey = ({ keyd, onEditSuccess }: EditProps) => {
  const putKeyMutation = usePutkey();
  const modalRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit } = useForm<Key>({
    defaultValues: keyd,
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onEditSuccess();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onEditSuccess]);

  const onSubmit = async (data: Key) => {
    try {
      await putKeyMutation.mutateAsync(data);
      onEditSuccess();
      toast.success(`Tarea actualizada con éxito!`);
    } catch (error) {
      toast.error("Ha ocurrido un error!");
    }
  };

  return (
    <>
      <div className="justify-center slide-in-fwd-top items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="w-full max-w-md" ref={modalRef}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-slate-950 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-3xl text-center text-gray-200 mb-3 font-bold">
              Actualizar datos
            </h1>
            <div className="mb-4 relative">
              <label
                className="block text-gray-100 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                id="password"
                required
                className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-purple-900 focus:bg-transparent focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute mt-6 inset-y-0 right-0 flex items-center px-3 text-gray-400"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className="flex">
              <div className="mb-4 w-1/2 mr-2">
                <label
                  className="block text-gray-100 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  required
                  className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-purple-900 focus:bg-transparent focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  type="text"
                  autoComplete="off"
                  {...register("username")}
                />
              </div>
              <div className="mb-4 w-1/2 ml-2 relative">
                <label
                  className="block text-gray-100 text-sm font-bold mb-2"
                  htmlFor="website"
                >
                  Sitio web
                </label>
                <input
                  id="website"
                  required
                  className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-purple-900 focus:bg-transparent focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  type="text"
                  autoComplete="off"
                  {...register("website")}
                />
              </div>
            </div>

            <div className="flex items-center mt-3 justify-center">
              <button
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-bold rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="submit"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className=" fixed inset-0 z-40 backdrop-blur-md bg-white/10"></div>
    </>
  );
};

export default EditKey;
