import { StyledGroupContainer } from "./FormGroup.styles";

type FormGroupProps = {
  children: React.ReactNode;
}

export const FormGroup = ({ children }: FormGroupProps) => {
  return (
    <StyledGroupContainer>
      {children}
    </StyledGroupContainer>
  )
}