import {
  makeLoginController,
  makeRefreshTokenController,
} from "@/main/application/controllers/auth";
import { Routes } from "@/application/contracts/routes";

const authRoutes: Routes = {
  login: {
    method: "POST",
    path: "/auth",
    controller: makeLoginController(),
  },
  refresh: {
    method: "POST",
    path: "/auth/refresh",
    controller: makeRefreshTokenController(),
  },
};

export default authRoutes;
