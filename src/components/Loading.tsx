import styled from "styled-components/native";

export function Loading() {
  return (
    <Container>
      <LoadIndicator />
    </Container>
  )
}


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${a => a.theme.COLORS.GRAY_600};
`

const LoadIndicator = styled.ActivityIndicator.attrs(a => ({
  color: a.theme.COLORS.GREEN_700
}))``