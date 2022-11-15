import React, { HTMLInputTypeAttribute, useId } from "react";
import { EmployeeActionKind } from "../../reducer";
import { StyledLabel } from "../../components/Select/Select.styles";
import { StyledContainer, StyledInput } from "./Input.styles";

type InputProps = {
  type: HTMLInputTypeAttribute;
  label: string;
  value: string;
  onChange: (action: EmployeeActionKind, payload: string) => any;
  action: EmployeeActionKind;
}

export const Input = ({ type, label, value, onChange, action }: InputProps) => {
  const id = useId();

  return (
    <StyledContainer>
      <StyledLabel htmlFor={id}>{label} </StyledLabel>
      <StyledInput required type={type} id={id} value={value} onChange={(e) => onChange(action, e.target.value)} />
    </StyledContainer>
  );
}