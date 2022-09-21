import styled, { css } from "styled-components/native"
import { MaterialIcons } from "@expo/vector-icons"
import { ButtonIcon } from "@components/ButtonIcon"

type Props = {
  name: string
  onRemove: () => void
}

export function PlayerCard({ name, onRemove }: Props) {
  return (
    <Container>
      <Icon name="person" />
      <Name>{name}</Name>
      <ButtonIcon icon="close" type="SECONDARY" onPress={onRemove} />
    </Container>
  )
}

const Container = styled.View`
  ${a => css`
    width: 100%;
    height: 56px;
    background-color: ${a.theme.COLORS.GRAY_500};
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
    border-radius: 6px;
  `}
`
const Name = styled.Text`
  ${a => css`
    flex: 1;
    font-size: ${a.theme.FONT_SIZE.MD}px;
    font-family: ${a.theme.FONT_FAMILY.REGULAR};
    color: ${a.theme.COLORS.GRAY_200};
  `}
`
const Icon = styled(MaterialIcons).attrs(a => ({
  size: 24,
  color: a.theme.COLORS.GRAY_200,
}))`
  margin-left: 16px;
  margin-right: 4px;
`