import { StyledButton, StyledContainer } from "./Button.styles";

export type TextAlignment = "center" | "start" | "end";

type ButtonProps = {
  type?: "button" | "submit" | "reset";
  content: string;
  onClick: (event: React.FormEvent) => void;
  align?: TextAlignment;
}

export const Button = ({ type, content, align, onClick }: ButtonProps) => {
  return (
    <StyledContainer align={align}>
      <StyledButton type={type} onClick={onClick}>{content}</StyledButton>
    </StyledContainer>
  )
}