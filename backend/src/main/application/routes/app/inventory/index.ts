import {
  makeAddProductController,
  makeRemoveProductController,
} from "@/main/application/controllers/products";
import { Routes } from "@/application/contracts/routes";
import { makeAuthMiddleware } from "@/main/application/middlewares/auth";

const productRoutes: Routes = {
  list: {
    method: "POST",
    path: "/inventory/add",
    controller: makeAddProductController(),
    middleware: makeAuthMiddleware(),
  },
  getById: {
    method: "POST",
    path: "/inventory/sub",
    controller: makeRemoveProductController(),
    middleware: makeAuthMiddleware(),
  },
};

export default productRoutes;
