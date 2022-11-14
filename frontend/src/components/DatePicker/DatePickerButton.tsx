import { StyledButtonImage, StyledPickerButton } from "./DatePicker.styles"

type DatePickerButtonProps = {
  src: string;
  onClick: () => void;
}

export const DatePickerButton = ({ src, onClick }: DatePickerButtonProps) => {
  return (
    <StyledPickerButton type="button" onClick={onClick}>
      <StyledButtonImage src={src} alt='' />
    </StyledPickerButton>
  )
}