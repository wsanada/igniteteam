import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { UsersThree } from "phosphor-react-native";
import { createGroup } from "@storage/group";
import { AppError, ErrorHandler } from "@utils/AppError";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";


export function NewGroup() {
  const navigation = useNavigation()
  const [group, setGroup] = useState('')

  //--[Events]----------------------------------------
  const button_Press = async () => {
    try {
      if (!group) {
        return Alert.alert('Ops!', 'Informe o nome da turma')
      }

      await createGroup(group)
      navigation.navigate('players', { group })

    } catch (error) {
      ErrorHandler(error)
    }
  }

  //--[Components]----------------------------------------
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <Container>
          <Header showBackButton />

          <Content>
            <Icon />

            <Highlight title="Nova turma" subtitle="crie uma turma para adicionar as pessoas" />

            <Input
              placeholder="Nome da turma"
              onChangeText={setGroup}
              onSubmitEditing={button_Press}
              returnKeyType="go"
            />

            <Button title="Criar" onPress={button_Press} style={{ marginTop: 20 }} />

          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${a => a.theme.COLORS.GRAY_600};
  padding: 24px;
`
const Content = styled.View`
  flex: 1;
  justify-content: center;
`
const Icon = styled(UsersThree).attrs(a => ({
  size: 56,
  color: a.theme.COLORS.GREEN_700,
}))`
  align-self: center;
`