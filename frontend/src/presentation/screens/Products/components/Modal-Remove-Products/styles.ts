import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    && {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: ${theme.spacings.small};
      padding: ${theme.spacings.xxsmall};
    }
  `}
`;

export const WrapperButton = styled.div``;
