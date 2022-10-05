import {
  Modal as ModalUiLib,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
};

import * as S from "./styles";

const Modal = (props: ModalProps): JSX.Element => {
  return (
    <ModalUiLib
      size={"6xl"}
      isOpen={props.open}
      onClose={() => props?.onClose()}
    >
      <ModalOverlay />
      <ModalContent>
        <S.Header>{props.title}</S.Header>
        <S.CloseIcon />
        <ModalBody>{props.children}</ModalBody>
      </ModalContent>
    </ModalUiLib>
  );
};

export default Modal;
