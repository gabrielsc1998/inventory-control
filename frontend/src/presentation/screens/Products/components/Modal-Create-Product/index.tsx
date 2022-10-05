import { useState } from "react";

import { STATUS } from "common/constants";
import { useToast } from "presentation/hooks";
import Input from "presentation/components/atom/Input";
import Button from "presentation/components/atom/Button";
import Modal from "presentation/components/molecules/Modal";
import Select, { Option } from "presentation/components/atom/Select";
import { makeCreateProductUseCase } from "main/application/modules/product/use-cases";

interface ModalCreateProductProps {
  open: boolean;
  onClose: () => void;
  categories: Array<Option>;
  onNewProductCreated: () => void;
}

import * as S from "./styles";

const ModalCreateProduct = (props: ModalCreateProductProps): JSX.Element => {
  const createProductUseCase = makeCreateProductUseCase();

  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
  });

  const disableButton = form.categoryId === "" || form.name === "";

  const handleCreateProduct = async (): Promise<void> => {
    const output = await createProductUseCase.execute(form);
    const hasError = output instanceof Error;

    let showError = false;
    if (!hasError) {
      if (output.status === STATUS.SUCCESS) {
        toast.show({
          type: "success",
          title: "Novo produto adicionado!",
        });
        props.onNewProductCreated();
      } else {
        showError = true;
      }
    } else {
      showError = true;
    }

    if (showError) {
      toast.show({
        type: "error",
        title: "Erro ao criar o produto",
      });
    }
  };

  return (
    <Modal title="Adicionar Produto" {...props}>
      <S.Container>
        <Input
          id="product-name-id"
          label="Nome"
          variant="flushed"
          placeholder="Insira o nome do produto"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Select
          placeholder="Selecione a Categoria"
          options={props?.categories || []}
          onChange={({ value }) =>
            setForm({ ...form, categoryId: String(value) })
          }
        />
        <S.WrapperButton>
          <Button
            label="Adicionar"
            id="create-button-id"
            disabled={disableButton}
            onClick={() => handleCreateProduct()}
          />
        </S.WrapperButton>
      </S.Container>
    </Modal>
  );
};

export default ModalCreateProduct;
