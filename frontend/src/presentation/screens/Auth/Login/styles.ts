import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100vh;
    min-height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${theme.colors.ui.primary};
  `}
`;

export const WrapperForm = styled.div`
  ${({ theme }) => css`
    width: 50%;
    height: 50%;
    min-width: 280px;
    min-height: 320px;
    max-width: 500px;
    max-height: 400px;

    display: flex;
    justify-content: center;
    flex-direction: column;

    border-radius: 0.25rem;

    padding: ${theme.spacings.small};

    background: ${theme.colors.neutral.white};
  `}
`;

export const WrapperFormFields = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${theme.spacings.xsmall};
    margin: ${theme.spacings.medium} 0;
  `}
`;
