import styled, { css } from "styled-components";
import { Button as ButtonUiLib } from "@chakra-ui/react";

export const Button = styled(ButtonUiLib)`
  ${({ theme }) => css`
    && {
      min-height: 40px;
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.neutral.white};
      background-color: ${theme.colors.ui.secondary};

      &:hover {
        opacity: 0.85;
        background-color: ${theme.colors.ui.secondary};
      }

      &:disabled {
        &:hover {
          opacity: 0.5;
          background-color: ${theme.colors.ui.secondary};
        }
      }
    }
  `}
`;
