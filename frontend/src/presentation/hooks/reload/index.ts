import { useRouter } from "next/router";

import { RELOAD } from "common/constants";

export interface UseReload {
  verify(data: string): void;
}

export const useReload = (): UseReload => {
  const router = useRouter();

  const verify = (data: string): void => {
    if (data === RELOAD) {
      router.reload();
    }
  };

  return {
    verify,
  };
};
