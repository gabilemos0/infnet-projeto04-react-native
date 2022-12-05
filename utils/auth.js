import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth
} from 'firebase/auth'
import { storeData, clearStorage, getData } from './storage'

const reautenticate = async app => {
  const user = await getData('user')
  if (user !== null) {
    await authLogin(app, user.email, user.passwordText)
  }
}

const userIsLoggedIn = async () => {
  const result = await getData('user')
  return result
}

const authLogin = async (firebaseApp, emailText, passwordText) => {
  const auth = getAuth(firebaseApp)
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      emailText,
      passwordText
    )
    console.log(result)
    storeData('user', {
      displayName: result.user.displayName,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
      photoURL: result.user.photoURL,
      uid: result.user.uid
    })
  } catch (err) {
    throw err
  }
}

const authRegister = async (firebaseApp, emailText, passwordText) => {
  const auth = getAuth(firebaseApp)
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      emailText,
      passwordText
    )
    storeData('user', {
      displayName: result.user.displayName,
      email: result.user.email,
      phoneNumber: result.user.phoneNumber,
      photoURL: result.user.photoURL,
      uid: result.user.uid
    })
  } catch (err) {
    throw err
  }
}

const authLogout = () => {
  clearStorage()
}

export { userIsLoggedIn, authLogin, authRegister, authLogout, reautenticate }
