import { GKey, Key } from "../interfaces/key.interface";
import { generateKey, getAllKeys } from "../services/key.service";
import { useQuery } from "@tanstack/react-query";

const useKeys = () => {
  return useQuery<Key[]>({
    queryKey: ["key"],
    queryFn: getAllKeys,
  });
};

const useGenerateKeys = () => {
  return useQuery<GKey>({
    queryKey: ["generate"],
    queryFn: generateKey,
  });
};

export { useKeys, useGenerateKeys };
