import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, Alert, Image } from 'react-native'
import { logout } from '../../actions';

const LogoutButton = (props) => {

  const confirmLogout = () => {
    Alert.alert(
      'Logout?',
      'Confirm you want to logout',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Logout', onPress: () => props.logout() },
      ],
      { cancelable: false }
    )
  }
  return (
  <TouchableOpacity onPress={ () => {
    confirmLogout()
  }} >
    <Image source={ require("../../images/ic_power_settings_new_black_36dp_1x.png") }/>
  </TouchableOpacity>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout())
    },
    dispatch: dispatch
  }
}

export default connect(null, mapDispatchToProps)(LogoutButton)
