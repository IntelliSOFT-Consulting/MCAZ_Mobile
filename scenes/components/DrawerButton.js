import React from 'react'

import { TouchableOpacity, Text, Image } from 'react-native'

const DrawerButton = ({ navigation }) => (
  <TouchableOpacity onPress={ () => navigation.navigate('DrawerOpen')} >
    <Image source={ require("../../images/ic_menu_black_36dp_1x.png") }/>
  </TouchableOpacity>
)

export default DrawerButton
