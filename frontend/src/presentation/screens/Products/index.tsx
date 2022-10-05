import { useEffect, useState } from "react";

import { STATUS } from "common/constants";
import { useToast } from "presentation/hooks";
import Button from "presentation/components/atom/Button";
import { ProductModel } from "domain/modules/product/model";
import { Option } from "presentation/components/atom/Select";
import Table, { TableColumn } from "presentation/components/organisms/Table";
import { makeListProductsUseCase } from "main/application/modules/product/use-cases";
import { makeListCategoriesUseCase } from "main/application/modules/category/use-cases";

import * as S from "./styles";
import ModalAddProduct from "./components/Modal-Add-Product";
import ModalAddCategory from "./components/Modal-Add-Category";

const ProductsScreen = (): JSX.Element => {
  const toast = useToast();

  const listProductsUseCase = makeListProductsUseCase();
  const listCategoriesUseCase = makeListCategoriesUseCase();

  const [showModal, setShowModal] = useState({
    product: false,
    category: false,
  });
  const [products, setProducts] = useState<Array<ProductModel>>([]);
  const [categories, setCategories] = useState<Array<Option>>([]);

  const closeModal = () => setShowModal({ product: false, category: false });

  const columns: Array<TableColumn> = [
    { header: "Nome", key: "name" },
    { header: "Categoria", key: "categoryName" },
    { header: "Quantidade", key: "quantity" },
  ];

  const handleListProducts = async (): Promise<void> => {
    const output = await listProductsUseCase.execute();
    const hasError = output instanceof Error;

    if (!hasError) {
      if (output.status === STATUS.SUCCESS) {
        const listOfProducts = output.data;
        setProducts(listOfProducts);
      }
    }
  };

  const handleListCategories = async (): Promise<void> => {
    const output = await listCategoriesUseCase.execute();
    const hasError = output instanceof Error;

    if (!hasError) {
      if (output.status === STATUS.SUCCESS) {
        const listOfCategories = output.data;
        setCategories(
          listOfCategories.map(({ id, name }) => ({
            label: name,
            value: id,
          }))
        );
      }
    }
  };

  useEffect(() => {
    (async () => {
      await handleListProducts();
      await handleListCategories();
    })();
  }, []);

  const Modals = (): JSX.Element => {
    return (
      <>
        <ModalAddProduct
          categories={categories}
          open={showModal.product}
          onClose={() => closeModal()}
          onNewProductAdded={async () => {
            await handleListProducts();
            closeModal();
          }}
        />
        <ModalAddCategory
          open={showModal.category}
          onClose={() => closeModal()}
          onNewCategoryAdded={async () => {
            await handleListCategories();
            closeModal();
          }}
        />
      </>
    );
  };

  return (
    <>
      <Modals />
      <S.WrapperButtons>
        <Button
          id="button-add-product-id"
          label="+ Novo Produto"
          onClick={() => setShowModal({ product: true, category: false })}
        />
        <Button
          id="button-add-category-id"
          label="+ Nova Categoria"
          onClick={() => setShowModal({ product: false, category: true })}
        />
      </S.WrapperButtons>
      <Table
        data={products}
        columns={columns}
        total={products.length}
        pageSize={15}
      />
    </>
  );
};

export default ProductsScreen;
