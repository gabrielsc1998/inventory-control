import { Th as ThUiLib, Thead } from "@chakra-ui/react";

import styled, { css } from "styled-components";

export const THead = styled(Thead)`
  ${({ theme }) => css`
    && {
      height: 40px;
      border-bottom: 1.5px solid ${theme.colors.neutral.mediumGray};
    }
  `}
`;

export const Th = styled(ThUiLib)`
  ${({ theme }) => css`
    && {
      text-align: center;
      font-weight: 800;
      color: ${theme.colors.neutral.darkGray};
      font-size: ${theme.font.sizes.xlarge};
    }
  `}
`;
