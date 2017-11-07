import React, { PureComponent } from 'react';

import { View, ScrollView, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import AppStyles from '../../styles/AppStyles'

export default class ReporterDetailsScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel, saveAndSubmit } = this.props
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <TextInputField model={ model } name="reporter_name" label="Forename(s) and Surname:*"/>
        <TextInputField model={ model } name="designation_id" label="Designation:*"/>
        <TextInputField model={ model } name="reporter_email" label="Email Address:*" keyboardType = 'email-address'/>
        <TextInputField model={ model } name="reporter_phone" label="Phone number" keyboardType = 'phone-pad'/>
        <TextInputField model={ model } label="Name &amp; Address of Institution" />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => saveAndSubmit() } title="Save and Submit"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
