import * as ImagePicker from 'expo-image-picker'
import * as mime from 'mime'
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1
  })

  if (!result.canceled) {
    const asset = result.assets[0]
    return asset.uri
  }

  return null
}

export { pickImage }
