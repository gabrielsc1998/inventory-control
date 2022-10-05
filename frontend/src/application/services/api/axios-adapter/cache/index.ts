import { AxiosAdapter } from "axios";
import { IAxiosCacheAdapterOptions, setupCache } from "axios-cache-adapter";

export const makeCacheAdapter = (): {
  adapter: AxiosAdapter;
  config: IAxiosCacheAdapterOptions;
} => {
  const cacheAdapter = setupCache({
    maxAge: 15000,
    exclude: {
      query: false,
      methods: ["put", "patch", "delete", "post"],
    },
  });

  return { adapter: cacheAdapter.adapter, config: cacheAdapter.config };
};
