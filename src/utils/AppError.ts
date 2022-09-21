import { Alert } from "react-native"

export class AppError {
  constructor(private message: string) { }
}

export function ErrorHandler(error: any, title?: string) {
  title = title ?? 'Ops!'
  if (error instanceof AppError)
    Alert.alert(title, error['message'])
  else {
    Alert.alert('Ops!', 'Deu algo errado. Tente novamente em instantes.')
  }
}