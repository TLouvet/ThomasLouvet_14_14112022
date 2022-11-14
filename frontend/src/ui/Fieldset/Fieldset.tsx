import { StyledFieldset } from "./Fieldset.styles"

type FieldsetProps = {
  children: React.ReactNode;
}

export const Fieldset = ({ children }: FieldsetProps) => {
  return (
    <StyledFieldset>
      {children}
    </StyledFieldset>
  )
}