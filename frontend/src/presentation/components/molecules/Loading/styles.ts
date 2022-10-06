import styled, { css } from "styled-components";
import { Spinner } from "@chakra-ui/react";

export const Container = styled.div`
  display: flex;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  opacity: 0.8;
  height: 100%;
  min-height: 100vh;
  z-index: 200000;
`;

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const Icon = styled(Spinner)`
  ${({ theme }) => css`
    color: ${theme.colors.neutral.darkGray};
  `}
`;

export const Label = styled.p`
  ${({ theme }) => css`
    padding-top: 0.5rem;
    color: ${theme.colors.neutral.darkGray};
    font-size: ${theme.font.sizes.large};
  `}
`;
