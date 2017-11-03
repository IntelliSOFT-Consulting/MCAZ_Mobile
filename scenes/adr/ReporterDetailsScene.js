import React, { PureComponent } from 'react';

import { View, ScrollView, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import AppStyles from '../../styles/AppStyles'

export default class ReporterDetailsScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <TextInputField label="Forename(s) and Surname:"/>
        <TextInputField label="Designation:"/>
        <TextInputField label="Email Address:" keyboardType = 'email-address'/>
        <TextInputField label="Phone number" keyboardType = 'phone-pad'/>
        <TextInputField label="Name &amp; Address of Institution" />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ this.saveAndContinue } title="Save changes"/>
          <Button onPress={ this.saveAndSubmit } title="Save and Submit"/>
          <Button onPress={ this.cancel } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
