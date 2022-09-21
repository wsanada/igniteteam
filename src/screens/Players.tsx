import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { Loading } from "@components/Loading";
import { PlayerCard } from "@components/PlayerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { deleteGroup } from "@storage/group";
import { addPlayer, deletePlayerFromGroup, getAllPlayerByGroupAndTeam, PlayerDTO } from "@storage/player";
import { AppError } from "@utils/AppError";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, Keyboard, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

type RouteParams = {
  group: string
}

export function Players() {
  const route = useRoute()
  const { group } = route.params as RouteParams
  const navigation = useNavigation()

  const [loading, setLoading] = useState(true)
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerDTO[]>([])
  const [newPlayer, setNewPlayer] = useState('')

  const newPlayerComponent = useRef<TextInput>(null)

  // --[Events]--------------------
  const buttonIcon_Press = async () => {
    try {
      if (!newPlayer) {
        throw new AppError('Informe o nome no jogador.')
      }

      const player = { name: newPlayer, team }

      setNewPlayer('')
      /*remove o foco do controle*/
      //newPlayerComponent.current?.blur()
      /*força fechamento do teclado*/
      //Keyboard.dismiss()

      await addPlayer(player, group)
      loadPlayer()


    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Ops!', error['message'])
      } else {
        Alert.alert('Ops!', 'Algo deu errado.')
        console.error(error)
      }
    }
  }
  const playerCardRemove_Press = async (name: string) => {
    try {

      await deletePlayerFromGroup(name, group)
      loadPlayer()

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Ops!', error['message'])
      } else {
        Alert.alert('Ops!', 'Algo deu errado.')
        console.error(error)
      }
    }
  }
  const removeButton_Press = async () => {
    try {
      return Alert.alert(
        'Remover este grupo',
        'Confirma a EXCLUSÃO deste grupo e todos os seus membros?',
        [
          { text: 'Não', style: 'cancel' },
          { text: 'Confirma', style: "default", onPress: () => removeGroup() },
        ]
      )
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Ops!', error['message'])
      } else {
        Alert.alert('Ops!', 'Algo deu errado.')
        console.error(error)
      }
    }
  }
  useEffect(() => {
    try {
      loadPlayer()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Ops!', error['message'])
      } else {
        Alert.alert('Ops!', 'Algo deu errado.')
        console.error(error)
      }
    }
  }, [team])

  // --[Methods]--------------------
  const loadPlayer = async () => {
    if (!loading)
      setLoading(true)

    const list = await getAllPlayerByGroupAndTeam(group, team)
    setPlayers(list)
    setLoading(false)
  }
  const removeGroup = async () => {
    await deleteGroup(group)
    navigation.navigate('groups')
  }

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />

      <Form>
        <Input
          inputRef={newPlayerComponent}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayer}
          value={newPlayer}
          onSubmitEditing={buttonIcon_Press}
          returnKeyType="done" />
        <ButtonIcon icon="add" onPress={buttonIcon_Press} />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (<Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />)}
          horizontal
        />

        <PlayerCount>{players.length}</PlayerCount>
      </HeaderList>

      {
        loading
          ?
          <Loading />
          :
          <FlatList
            data={players}
            keyExtractor={item => item.name + item.team}
            renderItem={({ item }) => (
              <PlayerCard name={item.name} onRemove={() => playerCardRemove_Press(item.name)} />
            )}
            ListEmptyComponent={() => (
              <ListEmpty message="Não há pessoas no time" />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
          />
      }

      <Button title="Remover turma" type="SECONDARY" onPress={removeButton_Press} />
    </Container>
  )
}

const Container = styled(SafeAreaView)`
  ${a => css`
    flex: 1;
    background-color: ${a.theme.COLORS.GRAY_600};
    padding: 24px;
  `}
`
const Form = styled.View`
  ${a => css`
    width: 100%;
    background-color: ${a.theme.COLORS.GRAY_700};
    flex-direction: row;
    justify-content: center;
    border-radius: 6px;
  `}
`
const HeaderList = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 32px 0 12px;
`
const PlayerCount = styled.Text`
  ${a => css`
    color: ${a.theme.COLORS.GRAY_200};
    font-family: ${a.theme.FONT_FAMILY.BOLD};
    font-size: ${a.theme.FONT_SIZE.SM}px;
  `}
`