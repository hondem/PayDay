import React, { AnchorHTMLAttributes } from "react";

export type ActionProps = {
  children: React.ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;