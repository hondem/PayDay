import React, { InputHTMLAttributes, useState } from 'react';
import { useField } from 'formik';

import * as S from './Input.styles';
import { AlertOctagon } from 'react-feather';

type InputProps = {
  icon?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

/* <Input />
============================================================================= */
const Input: React.FunctionComponent<InputProps> = ({
  icon,
  name,
  type,
  id,
  placeholder,
  disabled,
  autoFocus,
  ...props
}) => {
  const [field, { touched, error }] = useField({ name, type });
  const [isFocused, setFocus] = useState<boolean>(autoFocus);

  const hasError: boolean = !!touched && !!error;
  const { onBlur, ...otherFieldProps } = field;

  /**
   * Handles action for a focus event.
   */
  const handleFocus = () => { 
    setFocus(true);
  }

  /**
   * Handles action for a blur event.
   */
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur(event);
    setFocus(false);
  }

  /**
   * Renders icon based on the current state of input.
   */
  const renderIcon = () => {
    if (hasError) {
      return (
        <S.IconWrapper hasError={hasError}>
          <AlertOctagon />
        </S.IconWrapper>
      );
    } else {
      if (icon !== undefined) {
        return <S.IconWrapper hasError={hasError}>{icon}</S.IconWrapper>;
      } else return null;
    }
  };

  return (
    <S.Wrapper isFocused={isFocused} hasError={hasError}>
      {renderIcon()}

      <S.Input
        id={id || field.name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoFocus
        {...otherFieldProps}
        {...props}
      />
    </S.Wrapper>
  );
};

/* Default props - <Input />
============================================================================= */
Input.defaultProps = {
  type: 'text',
  disabled: false,
};

export default Input;
