import { Key } from "../interfaces/key.interface";
import { getAllKeys } from "../services/key.service";
import { useQuery } from "@tanstack/react-query";

const useKeys = () => {
  return useQuery<Key[]>({
    queryKey: ["key"],
    queryFn: getAllKeys,
  });
};

export { useKeys };
