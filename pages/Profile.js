import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { pickImage } from '../utils/image'
import {
  Stack,
  TextInput,
  Avatar,
  Button,
  Snackbar,
  FAB
} from '@react-native-material/core'
import { update } from '../utils/user'
import { getData } from '../utils/storage'
import { useState, useEffect } from 'react'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

const Profile = ({ route }) => {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  // const [phoneNumber, setPhoneNumber] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [snackbarShow, setSnackBarShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadProfile = async () => {
    let user = await getData('user')
    console.log(user, user.email)
    setEmail(user.email)
    setDisplayName(user.displayName)
    // setPhoneNumber(user.phoneNumber)
    try {
      setPhotoURL(user.photoURL)
    } catch (err) {
      // alert('Erro ao carregar imagem')
    }
  }

  const uploadPhoto = async () => {
    const image = await pickImage()
    if (image) {
      setPhotoURL(image)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])
  return (
    <Stack
      spacing={2}
      style={{
        justifyContent: 'center',
        height: '100%',
        padding: 20,
        alignItems: 'center'
      }}
    >
      <View>
        <TouchableOpacity onPress={uploadPhoto} activeOpacity={0.7}>
          <View>
            <Avatar
              image={{
                uri: photoURL
                  ? photoURL
                  : 'https://mui.com/static/images/avatar/1.jpg'
              }}
              size={150}
            />
            <Icon
              name="camera-outline"
              color={'white'}
              style={{
                position: 'absolute',
                bottom: -5,
                right: -5,
                padding: 10,
                borderRadius: 100,
                backgroundColor: 'tomato'
              }}
              size={30}
            />
          </View>
        </TouchableOpacity>
        {/* <FAB
          color="tomato"
          style={{ position: 'absolute', bottom: -10, right: -20 }}
          onPress={uploadPhoto}
          icon={props => (
            <Icon name="camera-outline" {...props} color={'white'} />
          )}
        /> */}
      </View>

      <TextInput
        style={{ margin: 16, width: '100%' }}
        color="tomato"
        label="E-mail"
        value={email}
        onChangeText={e => setEmail(e)}
        variant="outlined"
        leading={props => <Icon name="email-outline" {...props} />}
      />
      <TextInput
        style={{ margin: 16, width: '100%' }}
        color="tomato"
        label="Nome"
        value={displayName}
        onChangeText={e => setDisplayName(e)}
        variant="outlined"
        leading={props => <Icon name="account-outline" {...props} />}
      />
      {/* <TextInput
        style={{ margin: 16, width: '100%' }}
        color="tomato"
        label="Telefone"
        value={phoneNumber}
        onChangeText={e => setPhoneNumber(e)}
        variant="outlined"
        leading={props => <Icon name="phone-outline" {...props} />}
      /> */}
      <Button
        title="Editar Perfil"
        loading={loading}
        style={{ margin: 16, width: '100%' }}
        color="tomato"
        onPress={async () => {
          setLoading(true)
          await update(route.params.fireBaseApp, {
            email,
            displayName,
            // phoneNumber,
            photoURL
          })
          setLoading(false)
          setSnackBarShow(true)
        }}
      />
      {snackbarShow ? (
        <Snackbar
          message="Usuário alterado com sucesso!"
          action={
            <Button
              variant="text"
              title="Fechar"
              color="tomato"
              compact
              onPress={() => setSnackBarShow(false)}
            />
          }
          style={{ position: 'absolute', start: 16, end: 16, bottom: 16 }}
        />
      ) : (
        ''
      )}
    </Stack>
  )
}

export default Profile
