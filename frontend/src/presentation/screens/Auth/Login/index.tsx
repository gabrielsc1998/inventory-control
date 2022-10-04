import { useState } from "react";

import Input from "presentation/components/atom/Input";
import Button from "presentation/components/atom/Button";
import Logo from "presentation/components/molecules/Logo";
import { makeLoginUseCase } from "main/application/modules/auth/use-cases";
import InputPassword from "presentation/components/molecules/Input-Password";

import * as S from "./styles";

const LoginScreen = (): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (): Promise<void> => {
    setLoading(true);

    const loginUseCase = makeLoginUseCase();

    const output = await loginUseCase.execute({
      email: "admin@user.com",
      password: "123456",
    });

    const hasError = output instanceof Error;

    setTimeout(() => {
      setLoading(false);
    }, 250);
  };

  return (
    <S.Container>
      <S.WrapperForm>
        <Logo />
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
          onClick={async () => {
            await handleLogin();
          }}
        />
      </S.WrapperForm>
    </S.Container>
  );
};

export default LoginScreen;
