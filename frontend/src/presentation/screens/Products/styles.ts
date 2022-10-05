import { IconButton } from "@chakra-ui/react";
import styled, { css } from "styled-components";

export const WrapperButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacings.xxsmall};
    margin: ${theme.spacings.small} 0;
  `}
`;

export const ActionButton = styled(IconButton)`
  ${({ theme }) => css`
    && {
      width: 30px;
      height: 30px;
      border-radius: 50%;
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
