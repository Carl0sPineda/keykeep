import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteKey, postKey, putKey } from "../services/key.service";

const useDeleteKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteKey,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["key"] });
    },
  });
};

const useAddKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["key"] });
    },
  });
};

const usePutkey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["key"] });
    },
  });
};

export { useDeleteKey, useAddKey, usePutkey };
