import React, { useContext, createContext, useState, useCallback } from "react";

import Loading from "presentation/components/molecules/Loading";

export interface LoadingContextProps {
  children?: JSX.Element | string | number;
}

export interface LoadingContextOutput {
  show: () => void;
  close: () => void;
}

type CtrlLoading = {
  status: boolean;
  label?: string;
};

const LoadingContext = createContext<LoadingContextOutput>(
  {} as LoadingContextOutput
);

const LoadingProvider = (props: LoadingContextProps): JSX.Element => {
  const { children } = props;

  const [ctrlLoading, setCtrlLoading] = useState<CtrlLoading>({
    status: false,
  });

  const show = useCallback((): void => {
    setCtrlLoading({
      status: true,
    });
  }, [ctrlLoading]);

  const close = useCallback((): void => {
    setCtrlLoading({
      status: false,
    });
  }, [ctrlLoading]);

  return (
    <LoadingContext.Provider value={{ show, close }}>
      <Loading
        id="loading"
        active={ctrlLoading.status}
        label={ctrlLoading.label}
      />
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextOutput =>
  useContext(LoadingContext);

export default LoadingProvider;
