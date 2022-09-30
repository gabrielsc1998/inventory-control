import {
  makeCreateCategoryController,
  makeListCategoriesController,
} from "@/main/application/controllers/categories";
import { Routes } from "@/application/contracts/routes";
import { makeAuthMiddleware } from "@/main/application/middlewares/auth";

const categoryRoutes: Routes = {
  list: {
    method: "GET",
    path: "/categories",
    controller: makeListCategoriesController(),
    middleware: makeAuthMiddleware(),
  },
  create: {
    method: "POST",
    path: "/categories",
    controller: makeCreateCategoryController(),
    middleware: makeAuthMiddleware(),
  },
};

export default categoryRoutes;
