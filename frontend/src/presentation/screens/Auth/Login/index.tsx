import { useState } from "react";

import Image from "next/image";

import Input from "presentation/components/atom/Input";
import Button from "presentation/components/atom/Button";
import InputPassword from "presentation/components/molecules/Input-Password";

import * as S from "./styles";

const LoginScreen = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  return (
    <S.Container>
      <S.WrapperForm>
        <Image src={"/imgs/logo.svg"} width="100%" height="100%" alt="logo" />
        <S.WrapperFormFields>
          <Input
            id="input-email-id"
            label="E-mail"
            variant="flushed"
            placeholder="Insira seu e-mail"
          />
          <InputPassword
            id="input-password-id"
            label="Senha"
            placeholder="Insira sua senha"
          />
        </S.WrapperFormFields>
        <Button
          loading={loading}
          id="button-login-id"
          label="LOGIN"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
        />
      </S.WrapperForm>
    </S.Container>
  );
};

export default LoginScreen;
