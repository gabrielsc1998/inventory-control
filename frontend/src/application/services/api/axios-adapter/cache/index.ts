import { AxiosAdapter } from "axios";
import { setupCache } from "axios-cache-adapter";

export const makeCacheAdapter = (): AxiosAdapter => {
  const cacheAdapter = setupCache({
    maxAge: 15000,
    exclude: {
      query: false,
      methods: ["put", "patch", "delete"],
    },
    debug: true,
  });
  return cacheAdapter.adapter;
};
