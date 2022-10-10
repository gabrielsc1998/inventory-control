import { useEffect, useState } from "react";

import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

import Button from "presentation/components/atom/Button";
import { useLoading } from "presentation/providers/loading";
import { ProductModel } from "domain/modules/product/model";
import { Option } from "presentation/components/atom/Select";
import { DEFAULT_PAGE_SIZE, STATUS } from "common/constants";
import Table, { TableColumn } from "presentation/components/organisms/Table";
import { makeListProductsUseCase } from "main/application/modules/product/use-cases";
import { makeListCategoriesUseCase } from "main/application/modules/category/use-cases";

import * as S from "./styles";
import ModalAddProducts from "./components/Modal-Add-Products";
import ModalCreateProduct from "./components/Modal-Create-Product";
import ModalCreateCategory from "./components/Modal-Create-Category";
import ModalRemoveProducts from "./components/Modal-Remove-Products";

const ProductsScreen = (): JSX.Element => {
  const loading = useLoading();

  const listProductsUseCase = makeListProductsUseCase();
  const listCategoriesUseCase = makeListCategoriesUseCase();

  const defaultModalStatus = {
    createProduct: false,
    createCategory: false,
    addProducts: false,
    removeProducts: false,
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(defaultModalStatus);
  const [currentProductId, setCurrentProductId] = useState("");
  const [categories, setCategories] = useState<Array<Option>>([]);
  const [products, setProducts] = useState<{
    data: Array<ProductModel>;
    total: number;
  }>({
    data: [],
    total: 0,
  });

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
          disabled={
            products.data.find((product) => product.id === productId)
              .quantity === 0
          }
          onClick={() => {
            setCurrentProductId(productId);
            setShowModal({ ...defaultModalStatus, removeProducts: true });
          }}
        />
      ),
    },
  ];

  const handleListProducts = async (
    page: number,
    noCache?: boolean
  ): Promise<void> => {
    loading.show();

    const output = await listProductsUseCase.execute({
      pagination: {
        page: page,
      },
      noCache,
    });
    const hasError = output instanceof Error || output.error;

    if (!hasError) {
      if (output.status === STATUS.SUCCESS) {
        const listOfProducts = output.data;
        setProducts(listOfProducts);
      }
    }

    setTimeout(() => loading.close(), 150);
  };

  const handleListCategories = async (noCache?: boolean): Promise<void> => {
    loading.show();

    const output = await listCategoriesUseCase.execute({
      noCache,
    });
    const hasError = output instanceof Error || output.error;

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

    setTimeout(() => loading.close(), 150);
  };

  useEffect(() => {
    (async () => {
      await handleListProducts(currentPage);
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
            await handleListProducts(currentPage, true);
            closeModal();
          }}
        />
        <ModalCreateCategory
          open={showModal.createCategory}
          onClose={() => closeModal()}
          onNewCategoryCreated={async () => {
            await handleListCategories(true);
            closeModal();
          }}
        />
        <ModalAddProducts
          id={currentProductId}
          open={showModal.addProducts}
          onClose={() => closeModal()}
          onNewProductsAdded={async () => {
            await handleListProducts(currentPage, true);
            closeModal();
          }}
        />
        <ModalRemoveProducts
          id={currentProductId}
          open={showModal.removeProducts}
          onClose={() => closeModal()}
          onProductsRemoved={async () => {
            await handleListProducts(currentPage, true);
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
        columns={columns}
        data={products.data}
        total={products.total}
        pageSize={DEFAULT_PAGE_SIZE}
        onPageChange={async (newPage) => {
          if (newPage !== currentPage) {
            setCurrentPage(newPage);
            await handleListProducts(newPage);
          }
        }}
      />
    </>
  );
};

export default ProductsScreen;
