import { TouchableOpacityProps } from "react-native";
import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

type Props = TouchableOpacityProps & {
  title: string
  type?: ButtonTypeStyleProps
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}


type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY'
type ButtonProps = {
  type: ButtonTypeStyleProps
}
const Container = styled(TouchableOpacity) <ButtonProps>`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  background-color: ${a => a.type === 'PRIMARY' ? a.theme.COLORS.GREEN_700 : a.theme.COLORS.RED_DARK};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`
const Title = styled.Text`
  ${a => css`
    font-size: ${a.theme.FONT_SIZE.MD}px;
    color: ${a.theme.COLORS.WHITE};
    font-family: ${a.theme.FONT_FAMILY.BOLD};
  ` }
`