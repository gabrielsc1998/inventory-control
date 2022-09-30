import {
  makeCreateCategoryController,
  makeListCategoriesController,
} from "@/main/application/controllers/categories";
import { Routes } from "@/application/contracts/routes";

const categoryRoutes: Routes = {
  list: {
    method: "GET",
    path: "/categories",
    controller: makeListCategoriesController(),
  },
  create: {
    method: "POST",
    path: "/categories",
    controller: makeCreateCategoryController(),
  },
};

export default categoryRoutes;
