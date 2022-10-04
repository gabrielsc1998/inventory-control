import Header from "presentation/components/organisms/Header";

import * as S from "./styles";

interface LayoutProps {
  title: string;
  children: JSX.Element;
}

const Layout = (props: LayoutProps): JSX.Element => {
  return (
    <S.Container>
      <Header />
      <S.ContainerBody>
        <S.WrapperBody>
          <S.Title>{props.title}</S.Title>
          <S.TitleLine />
          {props.children}
        </S.WrapperBody>
      </S.ContainerBody>
    </S.Container>
  );
};

export default Layout;
