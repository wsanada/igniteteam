import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Button } from '@components/Button'
import { GroupCard } from '@components/GroupCard'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ListEmpty } from '@components/ListEmpty'
import { getAllGroup } from '@storage/group'
import { Loading } from '@components/Loading'
import { ErrorHandler } from '@utils/AppError'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  const [loading, setLoading] = useState(true)

  //--[Events]----------------------------------------
  const groupCard_Press = (group: string) => {
    try {
      navigation.navigate('players', { group })
    } catch (error) {
      ErrorHandler(error)
    }
  }

  const newGroup_Press = () => {
    try {
      navigation.navigate('new')
    } catch (error) {
      ErrorHandler(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      try {
        loadAll()
      } catch (error) {
        ErrorHandler(error)
      }
    }, [])
  )

  //--[Methods]----------------------------------------
  const loadAll = async () => {
    try {
      setLoading(true)

      const list = await getAllGroup()
      setGroups(list)

    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  //--[Components]----------------------------------------
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      {
        loading
          ?
          <Loading />
          :
          <FlatList
            data={groups}
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <GroupCard title={item} onPress={() => groupCard_Press(item)} />
            )}
            ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?" />}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            showsVerticalScrollIndicator={false}
          />
      }

      <Button title="Criar nova turma" onPress={newGroup_Press} />

    </Container>
  )
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${a => a.theme.COLORS.GRAY_600};
  padding: 24px;
`

