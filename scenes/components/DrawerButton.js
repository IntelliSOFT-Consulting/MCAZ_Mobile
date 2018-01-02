import React from 'react'

import { TouchableOpacity, Text } from 'react-native'

const DrawerButton = ({ navigation }) => (
  <TouchableOpacity onPress={ () => navigation.navigate('DrawerOpen')} >
    <Text>H</Text>
  </TouchableOpacity>
)

export default DrawerButton
