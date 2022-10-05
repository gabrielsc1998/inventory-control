import { STATUS_TYPES } from "common/constants";

export interface RefreshToken {
  execute(): Promise<RefreshToken.Output>;
}

export namespace RefreshToken {
  export type Output = { status: STATUS_TYPES; error?: Error };
}
