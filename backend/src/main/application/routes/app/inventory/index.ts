import {
  makeAddInventoryProductController,
  makeRemoveInventoryProductController,
} from "@/main/application/controllers/inventory";
import { Routes } from "@/application/contracts/routes";
import { makeAuthMiddleware } from "@/main/application/middlewares/auth";

const productRoutes: Routes = {
  list: {
    method: "POST",
    path: "/inventory/add",
    controller: makeAddInventoryProductController(),
    middleware: makeAuthMiddleware(),
  },
  getById: {
    method: "POST",
    path: "/inventory/sub",
    controller: makeRemoveInventoryProductController(),
    middleware: makeAuthMiddleware(),
  },
};

export default productRoutes;
