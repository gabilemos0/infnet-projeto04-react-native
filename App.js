import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { IconButton } from '@react-native-material/core'

import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import { initializeApp } from 'firebase/app'

import { useState, useEffect } from 'react'

import { getData } from './utils/storage'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { authLogout, userIsLoggedIn, reautenticate } from './utils/auth'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const firebaseConfig = {
  apiKey: 'AIzaSyB5h1ZHgVZv-sJBrRvtcBuyp0EAkj42F4Y',
  authDomain: 'pomodoro-timer-2dcc4.firebaseapp.com',
  projectId: 'pomodoro-timer-2dcc4',
  storageBucket: 'pomodoro-timer-2dcc4.appspot.com',
  messagingSenderId: '134521713919',
  appId: '1:134521713919:web:21ba2b2a211884f5d008ca'
}

const fireBaseApp = initializeApp(firebaseConfig)

export default function App() {
  const [IsLoggedIn, setIsLoggedIn] = useState(true)

  const verifyLogin = async () => {
    const user = await getData('user')
    if (user !== null) {
      setIsLoggedIn(true)
    }
  }

  useEffect(() => {
    verifyLogin()
    reautenticate()
  }, [])

  return (
    <NavigationContainer>
      {IsLoggedIn ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline'
              } else if (route.name === 'Login') {
                iconName = focused ? 'arrow-forward' : 'arrow-forward'
              } else if (route.name === 'Profile') {
                iconName = focused ? 'account' : 'account-outline'
              }

              return <Icon name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: '#FF575C',
            tabBarInactiveTintColor: 'gray'
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              headerRight: () => {
                return (
                  <IconButton
                    onPress={() => {
                      authLogout()
                      setIsLoggedIn(false)
                    }}
                    icon={props => (
                      <Icon name="logout" {...props} color={'tomato'} />
                    )}
                  />
                )
              }
            }}
          />

          <Tab.Screen
            name="Profile"
            component={Profile}
            initialParams={{
              fireBaseApp,
              setIsLoggedIn
            }}
            options={{
              title: 'Profile',
              headerRight: () => {
                return (
                  <IconButton
                    onPress={() => {
                      authLogout()
                      setIsLoggedIn(false)
                    }}
                    icon={props => (
                      <Icon name="logout" {...props} color={'tomato'} />
                    )}
                  />
                )
              }
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false
            }}
            initialParams={{
              fireBaseApp,
              setIsLoggedIn
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false
            }}
            initialParams={{
              fireBaseApp,
              setIsLoggedIn
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}
