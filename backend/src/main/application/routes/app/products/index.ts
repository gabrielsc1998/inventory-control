import {
  makeCreateProductController,
  makeGetOneProductController,
  makeListProductsController,
} from "@/main/application/controllers/products";
import { Routes } from "@/application/contracts/routes";
import { makeAuthMiddleware } from "@/main/application/middlewares/auth";

const productRoutes: Routes = {
  list: {
    method: "GET",
    path: "/products",
    controller: makeListProductsController(),
    middleware: makeAuthMiddleware(),
  },
  getById: {
    method: "GET",
    path: "/products/:id",
    controller: makeGetOneProductController(),
    middleware: makeAuthMiddleware(),
  },
  create: {
    method: "POST",
    path: "/products",
    controller: makeCreateProductController(),
    middleware: makeAuthMiddleware(),
  },
};

export default productRoutes;
