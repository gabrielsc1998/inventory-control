import styled, { css } from "styled-components";

import { Input as InputUiLib } from "@chakra-ui/react";

export const Container = styled.div`
  width: 100%;
`;

interface InputExtendedProps {
  hasIcon?: boolean;
}

export const Input = styled(InputUiLib)<InputExtendedProps>`
  ${({ theme, hasIcon }) => css`
    && {
      font-size: ${theme.font.sizes.small};
      padding-right: ${hasIcon ? "30px" : 0};
    }
  `}
`;

export const Label = styled.label`
  ${({ theme }) => css`
    display: flex;
    text-align: left;
    font-size: ${theme.font.sizes.small};
    color: ${theme.colors.neutral.black};
    padding-left: 2px;
    padding-bottom: 4px;
  `}
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const IconWrapper = styled.div`
  top: 0%;
  bottom: 0%;
  right: 0%;
  position: absolute;
`;
