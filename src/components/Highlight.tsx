import styled, { css } from "styled-components/native"

type Props = {
  title: string
  subtitle: string
}

export function Highlight({ title, subtitle }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </Container>
  )
}

const Container = styled.View`
  width: 100%;
  margin: 32px 0;
`
const Title = styled.Text`
  ${a => css`
    text-align: center;
    font-size: ${a.theme.FONT_SIZE.XL}px;
    font-family: ${a.theme.FONT_FAMILY.BOLD};
    color: ${a.theme.COLORS.WHITE};
  `}
`
const Subtitle = styled.Text`
  ${a => css`
    text-align: center;
    font-size: ${a.theme.FONT_SIZE.MD}px;
    font-family: ${a.theme.FONT_FAMILY.REGULAR};
    color: ${a.theme.COLORS.GRAY_300};
  `}
`
