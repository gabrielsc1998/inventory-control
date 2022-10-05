import { useState } from "react";

import { STATUS } from "common/constants";
import { useToast } from "presentation/hooks";
import Input from "presentation/components/atom/Input";
import Button from "presentation/components/atom/Button";
import Modal from "presentation/components/molecules/Modal";
import { makeRemoveProductsUseCase } from "main/application/modules/product/use-cases";

interface ModalRemoveProductsProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onProductsRemoved: () => void;
}

import * as S from "./styles";

const ModalRemoveProducts = (props: ModalRemoveProductsProps): JSX.Element => {
  const removeProductsUseCase = makeRemoveProductsUseCase();

  const toast = useToast();

  const [form, setForm] = useState({
    productId: props.id,
    quantity: "",
  });

  const disableButton = form.quantity === "";

  const handleCreateProduct = async (): Promise<void> => {
    const quantity = Number(form.quantity);
    if (quantity < 0) {
      toast.show({
        type: "error",
        title: "Valor inválido!",
      });
      return;
    }

    const output = await removeProductsUseCase.execute({
      productId: form.productId,
      quantity: Number(form.quantity),
    });

    const hasError = output instanceof Error;

    let showError = false;
    if (!hasError) {
      if (output.status === STATUS.SUCCESS) {
        toast.show({
          type: "success",
          title: "Produtos removidos do estoque!",
        });
        props.onProductsRemoved();
      } else {
        showError = true;
      }
    } else {
      showError = true;
    }

    if (showError) {
      toast.show({
        type: "error",
        title: "Erro ao remover os produtos",
      });
    }
  };

  return (
    <Modal title="Dar baixa no produto" {...props}>
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
            label="Dar Baixa"
            id="create-button-id"
            disabled={disableButton}
            onClick={() => handleCreateProduct()}
          />
        </S.WrapperButton>
      </S.Container>
    </Modal>
  );
};

export default ModalRemoveProducts;
