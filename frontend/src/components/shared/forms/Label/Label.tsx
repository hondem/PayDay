import React, { LabelHTMLAttributes } from 'react';

import * as S from './Label.styles';

/* <Label />
============================================================================= */
const Label: React.FunctionComponent<LabelHTMLAttributes<HTMLLabelElement>> = ({
  children,
  ...props
}) => <S.Label {...props}>{children}</S.Label>;

export default Label;
