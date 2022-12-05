import React from 'react'
import { TouchableOpacity } from 'react-native'
import {
  Stack,
  TextInput,
  IconButton,
  Button,
  Text
} from '@react-native-material/core'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import { authLogin } from '../utils/auth'

const Login = ({ navigation, route }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Stack
      spacing={2}
      style={{ justifyContent: 'center', height: '100%', padding: 20 }}
    >
      <Text
        style={{
          marginTop: 80,
          textAlign: 'center',
          color: 'black',
          fontSize: 30
        }}
      >
        Login
      </Text>
      <TextInput
        style={{ margin: 16 }}
        color="tomato"
        label=""
        value={email}
        onChangeText={e => setEmail(e)}
        variant="outlined"
        leading={props => <Icon name="account-outline" {...props} />}
      />
      <TextInput
        style={{ margin: 16 }}
        color="tomato"
        label=""
        value={password}
        onChangeText={e => setPassword(e)}
        variant="outlined"
        secureTextEntry={showPassword}
        leading={props => <Icon name="lock-outline" {...props} />}
        trailing={props => (
          <IconButton
            onPress={() => setShowPassword(!showPassword)}
            icon={props => (
              <Icon
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                {...props}
              />
            )}
            {...props}
          />
        )}
      />
      <Button
        title="Entrar"
        style={{ margin: 16 }}
        color="tomato"
        onPress={async () => {
          if (email !== '' && password !== '') {
            try {
              await authLogin(route.params.fireBaseApp, email, password)
              route.params.setIsLoggedIn(true)
            } catch (err) {
              alert('Login inválido!')
            }
          } else {
            alert('Todos os campos são obrigatórios')
          }
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            margin: 16,
            textAlign: 'center',
            color: 'tomato'
          }}
        >
          Registrar
        </Text>
      </TouchableOpacity>
    </Stack>
  )
}

export default Login
