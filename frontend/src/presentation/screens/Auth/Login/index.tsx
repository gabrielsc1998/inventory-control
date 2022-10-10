import { useState } from "react";

import { useRouter } from "next/router";

import { STATUS } from "common/constants";
import { useToast } from "presentation/hooks/toast";
import { SCREEN_ROUTES } from "presentation/routes";
import Input from "presentation/components/atom/Input";
import Button from "presentation/components/atom/Button";
import Logo from "presentation/components/molecules/Logo";
import { makeLoginUseCase } from "main/application/modules/auth/use-cases";
import InputPassword from "presentation/components/molecules/Input-Password";

import * as S from "./styles";

const LoginScreen = (): JSX.Element => {
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const disabledLogin = form.email === "" || form.password === "";

  const executeLoginByEnter = async ({
    code,
  }: {
    code: string;
  }): Promise<void> => {
    const enterCodes = ["Enter", "NumpadEnter"];
    if (!disabledLogin && enterCodes.includes(code)) {
      await handleLogin();
    }
  };

  const handleLogin = async (): Promise<void> => {
    setLoading(true);

    const loginUseCase = makeLoginUseCase();

    const output = await loginUseCase.execute({
      email: form.email,
      password: form.password,
    });

    const hasError = output instanceof Error;

    if (!hasError) {
      if (output.status === STATUS.SUCCESS) {
        toast.show({
          type: "success",
          title: "Bem vindo(a)",
        });
        setTimeout(() => router.replace(SCREEN_ROUTES.PRODUCTS), 250);
      } else {
        toast.show({
          type: "error",
          title: "Credenciais inválidas",
        });
        setTimeout(() => setLoading(false), 250);
      }
    } else {
      toast.show({
        type: "success",
        title: "Erro ao fazer o login",
      });
      setTimeout(() => setLoading(false), 250);
    }
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
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onKeyUpCapture={executeLoginByEnter}
          />
          <InputPassword
            id="input-password-id"
            label="Senha"
            placeholder="Insira sua senha"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onKeyUpCapture={executeLoginByEnter}
          />
        </S.WrapperFormFields>
        <Button
          disabled={disabledLogin}
          isLoading={loading}
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
