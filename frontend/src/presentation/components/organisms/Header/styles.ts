import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: ${theme.colors.neutral.lightGray};
  `}
`;

export const WrapperContent = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: 80%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${theme.breakPoints.tablet}) {
      width: 95%;
    }
  `}
`;
