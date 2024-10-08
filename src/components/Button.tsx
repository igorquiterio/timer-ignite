import { ButtonContainer, ButtonVariant } from "./Button.styles"

interface ButtonProps {
  variant: ButtonVariant
}

export function Button(){
  return <ButtonContainer>Enviar</ButtonContainer>
}