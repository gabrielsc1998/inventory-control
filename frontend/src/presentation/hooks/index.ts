import { useToast as useToastUiLib } from "@chakra-ui/react";

type ToastShowInput = {
  title: string;
  isClosable?: boolean;
  type: "success" | "error";
  duration?: number;
};

interface UseToast {
  show(input: ToastShowInput): void;
}

export const useToast = (): UseToast => {
  const toast = useToastUiLib();

  const show = (input: ToastShowInput): void => {
    toast({
      title: input.title,
      isClosable: input.isClosable,
      status: input.type,
      position: "top",
      duration: input?.duration || 5000,
    });
  };

  return {
    show,
  };
};
