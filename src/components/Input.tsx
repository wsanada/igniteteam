import React from "react";
import { TextInput, TextInputProps } from "react-native"
import styled, { css, useTheme } from "styled-components/native"

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: Props) {
  const { COLORS } = useTheme();

  return (
    <Container placeholderTextColor={COLORS.GRAY_300} ref={inputRef} {...rest}>
    </Container>
  )
}

const Container = styled(TextInput)`
  ${a => css`
    flex: 1;
    min-height: 56px;
    max-height: 56px;
    background-color: ${a.theme.COLORS.GRAY_700};
    color: ${a.theme.COLORS.WHITE};
    border-radius: 6px;
    padding: 16px;
    font-size: ${a.theme.FONT_SIZE.MD}px;
    font-family: ${a.theme.FONT_FAMILY.REGULAR};
  `}
`