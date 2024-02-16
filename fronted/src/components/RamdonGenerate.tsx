import { useQueryClient } from "@tanstack/react-query";
import { useGenerateKeys } from "../hooks/key.queries";
import passwordSvg from "../assets/password.svg";

const RamdonGenerate = () => {
  const { data: ramdon_key } = useGenerateKeys();
  const queryClient = useQueryClient();

  const handlePassword = () => {
    queryClient.invalidateQueries({ queryKey: ["generate"] });
  };

  return (
    <section className="text-gray-400">
      <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="hero"
          src={passwordSvg}
        />
        <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Genera una contraseña aleatoria
          </h1>
          <p className="mb-8 leading-relaxed text-balance">
            Te proporciona una contraseña segura y robusta formada por 12
            caracteres, símbolos, mayúsculas, minúsculas y números.
          </p>
          <div className="flex w-full justify-center items-end">
            <div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
              <div className="w-full h-11 text-center bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-purple-900 focus:bg-transparent focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                {ramdon_key ? ramdon_key.password : ""}
              </div>
            </div>
          </div>
          <button
            onClick={handlePassword}
            className="inline-flex mt-5 font-bold text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg"
          >
            Generar
          </button>
        </div>
      </div>
    </section>
  );
};

export default RamdonGenerate;
