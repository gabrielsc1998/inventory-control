import styled, { css } from "styled-components";

import { IconButton } from "@chakra-ui/react";

export const Container = styled.div`
  ${({ theme }) => css`
    margin-top: ${theme.spacings.small};
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  `}
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-direction: column;
  `}
`;

export const Label = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
  `}
`;

export const WrapperButttons = styled.div`
  ${({ theme }) => css`
    display: flex;
    margin-top: 4px;
    gap: ${theme.spacings.xxsmall};
  `}
`;

export const Button = styled(IconButton)`
  ${({ theme }) => css`
    && {
      width: 30px;
      height: 30px;
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.neutral.white};
      background-color: ${theme.colors.ui.secondary};

      &:hover {
        opacity: 0.85;
        background-color: ${theme.colors.ui.secondary};
      }

      &:disabled {
        pointer-events: none;
      }
    }
  `}
`;
