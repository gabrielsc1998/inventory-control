import { STATUS, STATUS_TYPES } from "common/constants";

type SuccessOutput<TData = any> = { status: STATUS_TYPES; data?: TData };
export const success = <TData = any>(data?: TData): SuccessOutput<TData> => {
  return {
    status: STATUS.SUCCESS,
    data,
  };
};

type ErrorOutput = { status: STATUS_TYPES; error: Error };
export const error = (error: Error): ErrorOutput => {
  return {
    status: STATUS.ERROR,
    error,
  };
};
