export interface InputProps {
  id: string;
  label: string;
  variant?: "outline" | "flushed";
  type?: "text" | "email" | "password" | "number";
  icon?: React.ReactElement;
  placeholder?: string;
}

import * as S from "./styles";

const Input = (props: InputProps): JSX.Element => {
  const hasIcon = Boolean(props.icon);
  return (
    <S.Container>
      <S.Label htmlFor={props.id}>{props.label}</S.Label>
      <S.InputWrapper>
        <S.Input
          id={props.id}
          variant={props.variant}
          type={props.type}
          hasIcon={hasIcon}
          placeholder={props.placeholder}
        />
        {hasIcon ? <S.IconWrapper>{props.icon}</S.IconWrapper> : null}
      </S.InputWrapper>
    </S.Container>
  );
};

export default Input;
