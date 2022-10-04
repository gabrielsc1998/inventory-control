import styled, { css } from "styled-components";

import { IconButton } from "@chakra-ui/react";

export const MenuButton = styled(IconButton)`
  ${({ theme }) => css`
    && {
      width: 30px;
      height: 30px;
      font-size: 15px;
      background: ${theme.colors.ui.primary};
      color: ${theme.colors.neutral.lightGray};

      &:hover {
        opacity: 0.85;
        background-color: ${theme.colors.ui.secondary};
      }
    }
  `}
`;
