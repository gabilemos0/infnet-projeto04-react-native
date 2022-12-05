import { registerRootComponent } from 'expo'

import App from './App'
import { decode } from 'base-64'
import { LogBox } from 'react-native'
LogBox.ignoreLogs([
  'AsyncStorage',
  'Non-serializable values',
  'Possible Unhandled'
])
if (typeof atob === 'undefined') {
  global.atob = decode
}
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
