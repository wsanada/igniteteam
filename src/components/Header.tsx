import styled from "styled-components/native"
import { CaretLeft } from 'phosphor-react-native'
import logoImg from "@assets/logo.png"
import { useNavigation } from "@react-navigation/native"

type Props = {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation()

  const backButton_Press = () => {
    //navigation.goBack()
    navigation.navigate('groups')
  }

  return (
    <Container>
      {
        showBackButton &&
        <BackButton onPress={backButton_Press}>
          <BackIcon />
        </BackButton>
      }
      <Logo source={logoImg} />
    </Container>
  )
}


const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Logo = styled.Image`
  width: 46px;
  height: 55px;
`

const BackButton = styled.TouchableOpacity`
  flex: 1;
`

const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE,
}))``