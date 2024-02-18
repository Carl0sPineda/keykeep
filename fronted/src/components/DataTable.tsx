import { useState } from "react";
import { useDeleteKey } from "../hooks/key.mutation";
import { useKeys } from "../hooks/key.queries";
import deleteIcon from "../assets/delete.svg";
import copyIcon from "../assets/copy.svg";
import editIcon from "../assets/edit.svg";
import toast from "react-hot-toast";
import EditKey from "./EditKey";

const DataTable = () => {
  const { data: keys } = useKeys();
  const deleteKeyMutation = useDeleteKey();

  const [editModalId, setEditModalId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteKeyMutation.mutateAsync(id);
      toast.success("Datos eliminados con éxito!");
    } catch (error) {
      toast.error(`Ocurrió un error al eliminar el dato ${error}`);
    }
  };

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.success("Contraseña copiada al portapapeles");
  };

  return (
    <table className="table-auto w-full text-left whitespace-no-wrap">
      <thead>
        <tr>
          <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
            Sitio web
          </th>
          <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
            Nombre de usuario
          </th>
          <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
            Contraseña
          </th>
          <th className="px-4 text-center py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
            Acciones
          </th>
          <th className="w-10 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tr rounded-br" />
        </tr>
      </thead>
      <tbody>
        {keys?.map((key) => (
          <tr key={key.id}>
            <td className="px-4 py-3 border-b border-gray-700" colSpan={1}>
              {key.website}
            </td>
            <td className="px-4 py-3 border-b border-gray-700" colSpan={1}>
              {key.username}
            </td>
            <td className="px-4 py-3 border-b border-gray-700" colSpan={1}>
              <span>{key.password.replace(/./g, "*")}</span>{" "}
            </td>
            <td className="px-4 py-3 border-b border-gray-700" colSpan={2}>
              <button
                onClick={() => handleDelete(key.id)}
                className="ml-4 inline-flex items-center justify-center w-6 h-6 bg-red-700 rounded-full hover:bg-red-800 focus:outline-none"
                title="Eliminar"
              >
                <img
                  src={deleteIcon}
                  className="w-3 h-3"
                  alt="deleteIcon.svg"
                />
              </button>
              <button
                onClick={() => handleCopyPassword(key.password)}
                className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-slate-800 rounded-full hover:bg-slate-900 focus:outline-none"
                title="Copiar"
              >
                <img src={copyIcon} alt="Copy.svg" className="w-3 h-3" />
              </button>
              <button
                onClick={() => setEditModalId(key.id)}
                className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-blue-700 rounded-full hover:bg-blue-800 focus:outline-none"
                title="Editar"
              >
                <img src={editIcon} alt="Edit.svg" className="w-3 h-3" />
              </button>
              {editModalId === key.id && (
                <EditKey
                  keyd={key}
                  onEditSuccess={() => setEditModalId(null)}
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
