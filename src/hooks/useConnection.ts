import { UpdateConnection } from "@/API/test";
import { useMutation } from "@tanstack/react-query";

export const useSendConnection = () => {
  return useMutation({
    mutationKey: ["send-connection"],
    mutationFn: (status: boolean) => UpdateConnection(status), // ambil data sesuai key
  });
};
