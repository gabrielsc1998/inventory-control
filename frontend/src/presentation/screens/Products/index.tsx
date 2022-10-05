import { useEffect, useState } from "react";

import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

import { STATUS } from "common/constants";
import { useToast } from "presentation/hooks";
import Button from "presentation/components/atom/Button";
import { ProductModel } from "domain/modules/product/model";
import { Option } from "presentation/components/atom/Select";
import Table, { TableColumn } from "presentation/components/organisms/Table";
import { makeListProductsUseCase } from "main/application/modules/product/use-cases";
import { makeListCategoriesUseCase } from "main/application/modules/category/use-cases";

import * as S from "./styles";
import ModalAddProducts from "./components/Modal-Add-Products";
import ModalCreateProduct from "./components/Modal-Create-Product";
import ModalCreateCategory from "./components/Modal-Create-Category";
import ModalRemoveProducts from "./components/Modal-Remove-Products";

const ProductsScreen = (): JSX.Element => {
  const toast = useToast();

  const listProductsUseCase = makeListProductsUseCase();
  const listCategoriesUseCase = makeListCategoriesUseCase();

  const defaultModalStatus = {
    createProduct: false,
    createCategory: false,
    addProducts: false,
    removeProducts: false,
  };

  const [showModal, setShowModal] = useState(defaultModalStatus);
  const [currentProductId, setCurrentProductId] = useState("");
  const [products, setProducts] = useState<Array<ProductModel>>([]);
  const [categories, setCategories] = useState<Array<Option>>([]);

  const closeModal = () => setShowModal(defaultModalStatus);

  const columns: Array<TableColumn> = [
    { header: "Nome", key: "name" },
    { header: "Categoria", key: "categoryName" },
    { header: "Quantidade", key: "quantity" },
    {
      header: "Dar Entrada",
      key: "id",
      formatter: (productId: string) => (
        <S.ActionButton
          icon={<ArrowBackIcon />}
          id="add-product-id"
          onClick={() => {
            setCurrentProductId(productId);
            setShowModal({ ...defaultModalStatus, addProducts: true });
          }}
        />
      ),
    },
    {
      header: "Dar Baixa",
      key: "id",
      formatter: (productId: string) => (
        <S.ActionButton
          icon={<ArrowForwardIcon />}
          id="sub-product-id"
          onClick={() => {
            setCurrentProductId(productId);
            setShowModal({ ...defaultModalStatus, removeProducts: true });
          }}
        />
      ),
    },
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
        <ModalCreateProduct
          categories={categories}
          open={showModal.createProduct}
          onClose={() => closeModal()}
          onNewProductCreated={async () => {
            await handleListProducts();
            closeModal();
          }}
        />
        <ModalCreateCategory
          open={showModal.createCategory}
          onClose={() => closeModal()}
          onNewCategoryCreated={async () => {
            await handleListCategories();
            closeModal();
          }}
        />
        <ModalAddProducts
          id={currentProductId}
          open={showModal.addProducts}
          onClose={() => closeModal()}
          onNewProductsAdded={async () => {
            await handleListProducts();
            closeModal();
          }}
        />
        <ModalRemoveProducts
          id={currentProductId}
          open={showModal.removeProducts}
          onClose={() => closeModal()}
          onProductsRemoved={async () => {
            await handleListProducts();
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
          onClick={() =>
            setShowModal({ ...defaultModalStatus, createProduct: true })
          }
        />
        <Button
          id="button-add-category-id"
          label="+ Nova Categoria"
          onClick={() =>
            setShowModal({ ...defaultModalStatus, createCategory: true })
          }
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
