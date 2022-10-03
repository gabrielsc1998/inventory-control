import styled, { css } from "styled-components";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Icon = css`
  ${({ theme }) => css`
    && {
      color: ${theme.colors.neutral.gray};
      font-size: 2.25rem;
      &:hover {
        cursor: pointer;
      }
    }
  `}
`;

export const ShowPasswordIcon = styled(ViewIcon)`
  ${Icon}
`;

export const HidePasswordIcon = styled(ViewOffIcon)`
  ${Icon}
`;
