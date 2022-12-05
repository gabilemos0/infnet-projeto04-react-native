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
import { authRegister } from '../utils/auth'

const Register = ({ navigation, route }) => {
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
        Registre-se
      </Text>
      <TextInput
        style={{ margin: 16 }}
        color="tomato"
        label=""
        value={email}
        onChangeText={e => {
          setEmail(e)
        }}
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
        title="Registrar"
        style={{ margin: 16 }}
        color="tomato"
        onPress={
          async () => {
            if (email && password) {
              try {
                console.log(email, password)
                await authRegister(route.params.fireBaseApp, email, password)
                route.params.setIsLoggedIn(true)
              } catch (err) {
                console.error(err)
                alert('Registro inválido!')
              }
            } else {
              alert('Todos os campos são obrigatórios')
            }
          }
          // route.params.setIsLoggedIn(true)
        }
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text
          style={{
            margin: 16,
            textAlign: 'center',
            color: 'tomato'
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
    </Stack>
  )
}

export default Register
