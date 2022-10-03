import { useState } from "react";

import Input, { InputProps } from "presentation/components/atom/Input";

import * as S from "./styles";

const InputPassword = (props: InputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeShowPassword = (show: boolean): void => {
    setShowPassword(show);
  };

  return (
    <Input
      {...props}
      type={showPassword ? "text" : "password"}
      variant={"flushed"}
      icon={
        showPassword ? (
          <S.HidePasswordIcon onClick={() => handleChangeShowPassword(false)} />
        ) : (
          <S.ShowPasswordIcon onClick={() => handleChangeShowPassword(true)} />
        )
      }
    />
  );
};

export default InputPassword;
