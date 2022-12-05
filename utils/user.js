import { getAuth, updateProfile } from 'firebase/auth'
import { saveImageBase64ToUrl, storeData } from './storage'

const update = async (app, object) => {
  const auth = getAuth(app)
  let fileName

  try {
    fileName = await saveImageBase64ToUrl(
      app,
      object.email.replace(/[^a-zA-Z0-9]/g, ''),
      object.photoURL
    )
    object.photoURL = fileName
  } catch (err) {
    console.log(err)
  }

  try {
    console.log(object)
    updateProfile(auth.currentUser, object)
    await auth.currentUser.reload()
    console.log('currentUser', {
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
      uid: auth.currentUser.uid
    })
    storeData('user', object)
  } catch (err) {
    console.log('Erro ao salvar perfil', err)
  }
}

export { update }
