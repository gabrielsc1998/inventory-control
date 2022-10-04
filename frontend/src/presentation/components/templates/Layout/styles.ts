import styled, { css } from "styled-components";

export const Container = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100vh;
    min-height: 100%;

    background: ${theme.colors.ui.primary};

    display: grid;
    gap: ${theme.spacings.xxsmall};
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  `}
`;

export const ContainerBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperBody = styled.div`
  ${({ theme }) => css`
    width: 80%;
    height: 100%;

    border-top-left-radius: 2.5px;
    border-top-right-radius: 2.5px;

    background: ${theme.colors.neutral.lightGray};

    padding: ${theme.spacings.small};

    @media (max-width: ${theme.breakPoints.tablet}) {
      width: 95%;
      padding: ${theme.spacings.xsmall};
    }
  `}
`;

export const Title = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    color: ${theme.colors.neutral.darkGray};
    text-align: "left";
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  `}
`;

export const TitleLine = styled.hr`
  ${({ theme }) => css`
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 0.5px solid ${theme.colors.neutral.mediumGray};
    margin-bottom: ${theme.spacings.xsmall};

    @media (max-width: ${theme.breakPoints.tablet}) {
      margin-bottom: ${theme.spacings.xxsmall};
    }
  `}
`;
