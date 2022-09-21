import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";

type Props = TouchableOpacityProps & FilterStyleProps & {
  title: string
}

export function Filter({ title, isActive = false, ...rest }: Props) {
  return (
    <Container isActive={isActive} {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}


type FilterStyleProps = {
  isActive: boolean
}

const Container = styled(TouchableOpacity) <FilterStyleProps>`
  ${a => a.isActive && css`
    border: 1px solid ${a.theme.COLORS.GREEN_700};
  `}

  border-radius: 4px;
  margin-right: 12px;
  height: 38px;
  width: 70px;
  align-items: center;
  justify-content: center;
`
const Title = styled.Text`
  ${a => css`
    font-family: ${a.theme.FONT_FAMILY.BOLD};
    font-size: ${a.theme.FONT_SIZE.SM}px;
    color: ${a.theme.COLORS.WHITE};
  `}
`