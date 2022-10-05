import { useState } from "react";

import { STATUS } from "common/constants";
import { useToast } from "presentation/hooks";
import Input from "presentation/components/atom/Input";
import Button from "presentation/components/atom/Button";
import Modal from "presentation/components/molecules/Modal";
import { makeCreateCategoryUseCase } from "main/application/modules/category/use-cases";

interface ModalCreateCategoryProps {
  open: boolean;
  onClose: () => void;
  onNewCategoryCreated: () => void;
}

import * as S from "./styles";

const ModalCreateCategory = (props: ModalCreateCategoryProps): JSX.Element => {
  const createCategoryUseCase = makeCreateCategoryUseCase();

  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
  });

  const disableButton = form.name === "";

  const handleCreateCategory = async (): Promise<void> => {
    const output = await createCategoryUseCase.execute(form);
    const hasError = output instanceof Error;

    let showError = false;
    if (!hasError) {
      if (output.status === STATUS.SUCCESS) {
        toast.show({
          type: "success",
          title: "Nova categoria adicionada!",
        });
        props.onNewCategoryCreated();
      } else {
        showError = true;
      }
    } else {
      showError = true;
    }

    if (showError) {
      toast.show({
        type: "error",
        title: "Erro ao criar a categoria",
      });
    }
  };

  return (
    <Modal title="Adicionar Categoria" {...props}>
      <S.Container>
        <Input
          id="category-name-id"
          label="Nome"
          variant="flushed"
          placeholder="Insira o nome da categoria"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <S.WrapperButton>
          <Button
            label="Adicionar"
            id="create-button-id"
            disabled={disableButton}
            onClick={() => handleCreateCategory()}
          />
        </S.WrapperButton>
      </S.Container>
    </Modal>
  );
};

export default ModalCreateCategory;
