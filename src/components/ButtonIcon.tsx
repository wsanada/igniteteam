import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import styled from "styled-components/native"
import { MaterialIcons } from '@expo/vector-icons'

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconTypeStyleProps
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon name={icon} type={type} />
    </Container>
  )
}

type ButtonIconTypeStyleProps = 'PRIMARY' | 'SECONDARY'
type ButtonIconProps = {
  type: ButtonIconTypeStyleProps
}

const Container = styled(TouchableOpacity)`
  width: 56px;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
`
const Icon = styled(MaterialIcons).attrs<ButtonIconProps>(a => ({
  size: 24,
  color: a.type === 'PRIMARY' ? a.theme.COLORS.GREEN_700 : a.theme.COLORS.RED,
}))``