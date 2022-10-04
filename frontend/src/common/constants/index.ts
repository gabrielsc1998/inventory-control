export type STATUS_TYPES = "error" | "success";

export const STATUS: Record<Uppercase<STATUS_TYPES>, STATUS_TYPES> = {
  ERROR: "error",
  SUCCESS: "success",
};
