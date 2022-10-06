import React from "react";

import * as S from "./styles";

interface ILoadingProps {
  id: string;
  testId?: string;
  label?: string;
  active: boolean;
}

const Loading = ({
  id,
  testId,
  active,
  label = "Carregando...",
}: ILoadingProps): JSX.Element => {
  return (
    <>
      {active ? (
        <S.Container id={id} data-testid={testId}>
          <S.Wrapper>
            <S.Icon size={"xl"} />
            <S.Label>{label}</S.Label>
          </S.Wrapper>
        </S.Container>
      ) : null}
    </>
  );
};

export default Loading;
