import React from 'react'
import { Text, View } from 'react-native'
import { Button, Avatar } from '@react-native-material/core'
import { useState } from 'react'

import Icon from '@expo/vector-icons/MaterialCommunityIcons'

const Home = ({ navigation }) => {
  const [minute, setMinute] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [startPomodoro, setStartPomodoro] = useState(false)
  const [intervalMinute, setIntervalMinute] = useState(false)
  const [intervalSeconds, setIntervalSeconds] = useState(false)

  const stopPomodoro = () => {
    setMinute(25)
    setSeconds(0)
    setStartPomodoro(false)

    clearInterval(intervalMinute)
    clearInterval(intervalSeconds)
  }
  const initPomodoro = () => {
    setMinute(24)
    setSeconds(59)
    setStartPomodoro(true)

    let countMinute = 24

    setIntervalMinute(
      setInterval(() => {
        setMinute(--countMinute)
        if (countMinute === 0) {
          clearInterval(intervalMinute)
          clearInterval(intervalSeconds)
        }
      }, 1000 * 60)
    )

    let countSecond = 60
    setIntervalSeconds(
      setInterval(() => {
        if (countSecond === 0) {
          setSeconds(59)
          countSecond = 59
        } else {
          setSeconds(--countSecond)
        }
      }, 1000)
    )
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fddfbe'
      }}
    >
      <Avatar
        image={{
          uri: 'https://vivaldi.com/wp-content/uploads/The_Pomodoro_timer_in_Vivaldi_browser-980x551.png'
        }}
        size={150}
        style={{ margin: 15 }}
      />
      <Text
        variant="h1"
        style={{
          marginBottom: 32,
          fontSize: 42,
          backgroundColor: '#fddfbe',
          padding: 14,
          borderRadius: 30,
          borderWidth: 2,
          borderColor: 'tomato',
          color: 'tomato'
        }}
      >
        {`0${minute}`.slice(-2)}:{`0${seconds}`.slice(-2)}
      </Text>
      {startPomodoro ? (
        <Button
          title={props => (
            <Icon name={'pause'} {...props} size={23} color={'white'} />
          )}
          style={{ padding: 5 }}
          color="tomato"
          onPress={stopPomodoro}
        />
      ) : (
        <Button
          title={props => (
            <Icon name={'play'} {...props} size={23} color={'white'} />
          )}
          style={{ padding: 5 }}
          color="tomato"
          onPress={initPomodoro}
        />
      )}
      {/* <Stack
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 10,
          justifyContent: 'space-evenly',
          width: '50%'
        }}
      >
        <Button
          title={props => (
            <Icon
              name={stopPomodoro ? 'pause' : 'play'}
              {...props}
              size={23}
              color={'white'}
            />
          )}
          style={{ padding: 5 }}
          color="tomato"
          onPress={() => {
            setRunning(!running)
          }}
        />

        <Button
          title={props => (
            <Icon name="reload" {...props} size={23} color={'white'} />
          )}
          style={{ padding: 5 }}
          color="tomato"
          onPress={() => {
            setRunning(false)
            setId(id + 1)
          }}
        />
      </Stack> */}
    </View>
  )
}

export default Home
