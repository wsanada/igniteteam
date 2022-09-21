import AsyncStorage from '@react-native-async-storage/async-storage'
import { PLAYER_COLLECTION } from '@storage/config'
import { AppError } from '@utils/AppError'

export interface PlayerDTO {
  name: string
  team: string
}

export const addPlayer = async (player: PlayerDTO, group: string) => {
  try {
    const list = await getAllPlayerByGroup(group)

    const playerJaExiste = list.find(a => a.name === player.name)
    if (playerJaExiste)
      throw new AppError(`O jogador '${player.name}' já está no time '${group}'`)

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...list, player]))

  } catch (error) {
    throw error
  }
}

export const getAllPlayerByGroup = async (group: string): Promise<PlayerDTO[]> => {
  try {
    const data = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)

    const list: PlayerDTO[] = data ? JSON.parse(data) : []
    return list

  } catch (error) {
    throw error
  }
}

export const getAllPlayerByGroupAndTeam = async (group: string, team: string): Promise<PlayerDTO[]> => {
  try {
    const data = await getAllPlayerByGroup(group)
    const list = data.filter(a => a.team === team)
    return list
  } catch (error) {
    throw error
  }
}

export const deletePlayerFromGroup = async (name: string, group: string): Promise<void> => {
  try {
    const list = await getAllPlayerByGroup(group)
    const filtered = list.filter(a => a.name.toLowerCase() !== name.toLowerCase());
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(filtered));

  } catch (error) {
    throw error
  }
}