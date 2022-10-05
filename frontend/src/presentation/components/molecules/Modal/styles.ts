import styled, { css } from "styled-components";
import { ModalHeader, ModalCloseButton } from "@chakra-ui/react";

export const Header = styled(ModalHeader)`
  ${({ theme }) => css`
    && {
      color: ${theme.colors.neutral.darkGray};
      font-size: ${theme.font.sizes.medium};
    }
  `}
`;

export const CloseIcon = styled(ModalCloseButton)`
  ${({ theme }) => css`
    && {
      color: ${theme.colors.general.red};
      font-size: ${theme.font.sizes.xsmall};
    }
  `}
`;
