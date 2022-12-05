import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable
} from 'firebase/storage'

const saveImageBase64ToUrl = async (app, prefix, uri) => {
  const fileName = `${prefix}_profile.jpeg`
  const storage = getStorage(app)
  const storageRef = ref(storage, fileName)
  console.log(fileName, uri)
  const response = await fetch(uri)
  const blobFile = await response.blob()
  try {
    await uploadBytesResumable(storageRef, blobFile)
    const url = await getDownloadURL(storageRef)
    console.log(`Uploaded image to: ${url}`)
    return url
  } catch (err) {
    throw err
  }
}

const getFile = async (app, image) => {
  const storage = getStorage(app)
  return await getDownloadURL(ref(storage, image))
}

const storeData = async (key, value) => {
  const valorJson = JSON.stringify(value)
  await AsyncStorage.setItem(key, valorJson)
}

const getData = async key => {
  const textoJson = await AsyncStorage.getItem(key)
  const jsonConvertido = JSON.parse(textoJson)
  return jsonConvertido
}

const clearStorage = async () => {
  AsyncStorage.clear()
}

export { storeData, getData, clearStorage, saveImageBase64ToUrl, getFile }
