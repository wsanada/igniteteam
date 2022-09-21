import styled, { css } from "styled-components/native";

type Props = {
  message: string
}

export function ListEmpty({ message }: Props) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const Message = styled.Text`
  ${a => css`
    text-align: center;
    font-size: ${a.theme.FONT_SIZE.SM}px;
    font-family: ${a.theme.FONT_FAMILY.REGULAR};
    color: ${a.theme.COLORS.GRAY_300};
  `}
`