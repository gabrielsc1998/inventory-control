import styled, { css } from "styled-components";

export const WrapperButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    gap: ${theme.spacings.xxsmall};
    margin: ${theme.spacings.small} 0;
  `}
`;
