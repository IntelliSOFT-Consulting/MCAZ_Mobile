import React from 'react'

import { TouchableOpacity, Text, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const DrawerButton = (props) => (
  <TouchableOpacity onPress={ () => {

    props.navigation.toggleDrawer()
  }} >
    <Image source={ require("../../images/ic_menu_black_36dp_1x.png") }/>
  </TouchableOpacity>
)

export default DrawerButton
