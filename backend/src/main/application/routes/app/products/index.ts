import {
  makeCreateProductController,
  makeGetOneProductController,
  makeListProductsController,
} from "@/main/application/controllers/products";
import { Routes } from "@/application/contracts/routes";

const productRoutes: Routes = {
  list: {
    method: "GET",
    path: "/products",
    controller: makeListProductsController(),
  },
  getById: {
    method: "GET",
    path: "/products:id",
    controller: makeGetOneProductController(),
  },
  create: {
    method: "POST",
    path: "/products",
    controller: makeCreateProductController(),
  },
};

export default productRoutes;
