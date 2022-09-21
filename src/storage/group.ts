import AsyncStorage from '@react-native-async-storage/async-storage'
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/config'
import { AppError } from '@utils/AppError'

export const createGroup = async (name: string): Promise<void> => {
  try {
    const list = await getAllGroup()
    const grupoJaExiste = list.find(a => a === name)
    if (grupoJaExiste)
      throw new AppError(`O grupo '${name}' não pôde ser usado, pois já existe.`)

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify([...list, name]))
  } catch (error) {
    throw error
  }
}

export const getAllGroup = async (): Promise<string[]> => {
  try {
    const data = await AsyncStorage.getItem(GROUP_COLLECTION)
    const list: string[] = data ? JSON.parse(data) : []
    return list
  } catch (error) {
    throw error
  }
}

export const deleteGroup = async (group: string): Promise<void> => {
  try {
    const list = await getAllGroup()
    const filtered = list.filter(a => a !== group)

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(filtered))
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`)

  } catch (error) {
    throw error
  }
}