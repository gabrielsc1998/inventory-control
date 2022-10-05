import { useState } from "react";

import { STATUS } from "common/constants";
import { useToast } from "presentation/hooks";
import Input from "presentation/components/atom/Input";
import Button from "presentation/components/atom/Button";
import Modal from "presentation/components/molecules/Modal";
import { makeAddProductsUseCase } from "main/application/modules/product/use-cases";

interface ModalAddProductsProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onNewProductsAdded: () => void;
}

import * as S from "./styles";

const ModalAddProducts = (props: ModalAddProductsProps): JSX.Element => {
  const addProductsUseCase = makeAddProductsUseCase();

  const toast = useToast();

  const [form, setForm] = useState({
    productId: props.id,
    quantity: "",
  });

  const disableButton = form.quantity === "";

  const handleCreateProduct = async (): Promise<void> => {
    const output = await addProductsUseCase.execute({
      productId: form.productId,
      quantity: Number(form.quantity),
    });

    const hasError = output instanceof Error;

    let showError = false;
    if (!hasError) {
      if (output.status === STATUS.SUCCESS) {
        toast.show({
          type: "success",
          title: "Produtos adicionados ao estoque!",
        });
        props.onNewProductsAdded();
      } else {
        showError = true;
      }
    } else {
      showError = true;
    }

    if (showError) {
      toast.show({
        type: "error",
        title: "Erro ao adicionar os produtos",
      });
    }
  };

  return (
    <Modal title="Dar entrada no produto" {...props}>
      <S.Container>
        <Input
          id="product-quantity-id"
          type="number"
          label="Quantidade de produtos"
          variant="flushed"
          placeholder="Insira a quantidade"
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />
        <S.WrapperButton>
          <Button
            label="Dar Entrada"
            id="create-button-id"
            disabled={disableButton}
            onClick={() => handleCreateProduct()}
          />
        </S.WrapperButton>
      </S.Container>
    </Modal>
  );
};

export default ModalAddProducts;
