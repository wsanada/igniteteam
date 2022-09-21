import { UsersThree } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled, { css } from "styled-components/native";

type Props = TouchableOpacityProps & {
  title: string
}

export function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  )
}

const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;
  background-color: ${(a) => a.theme.COLORS.GRAY_500};
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  padding: 24px;
  margin-bottom: 12px;
`
const Title = styled.Text`
  ${a => css`
    font-size: ${a.theme.FONT_SIZE.MD}px;
    color: ${a.theme.COLORS.GRAY_200};
    font-family: ${a.theme.FONT_FAMILY.REGULAR};
  `}
`
const Icon = styled(UsersThree).attrs(a => ({
  size: 32,
  color: a.theme.COLORS.GREEN_700,
  weight: 'fill',
}))`
  margin-right: 20px;
`