import type { ChangeEvent, InputHTMLAttributes } from "react";

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  type: string;
  name: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onInputTrim: () => void;
  value: string;
  errorMessage: string;
};
