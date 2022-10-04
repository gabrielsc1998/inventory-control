import Logo from "presentation/components/molecules/Logo";

import TopMenu from "../Top-Menu";

import * as S from "./styles";

const Header = (): JSX.Element => {
  return (
    <S.Container>
      <S.WrapperContent>
        <Logo width="300px" />
        <TopMenu />
      </S.WrapperContent>
    </S.Container>
  );
};

export default Header;
