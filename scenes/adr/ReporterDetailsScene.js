import React, { PureComponent } from 'react';

import { View, ScrollView, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import AppStyles from '../../styles/AppStyles'
import { DESIGNATION } from '../../utils/FieldOptions'

export default class ReporterDetailsScene extends PureComponent {

  render() {
    const { model, saveAndContinue, cancel, saveAndSubmit, user } = this.props
    return (
      <ScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ]  }>
        <TextInputField model={ model } name="reporter_name" label="Forename(s) and Surname: " required={ true }/>
        <SelectOneField model={ model } name="designation_id" label="Designation: " options={ DESIGNATION } required={ true }/>
        <TextInputField model={ model } name="reporter_email" label="Email Address: " keyboardType = 'email-address' required={ true }/>
        <TextInputField model={ model } name="reporter_phone" label="Phone number" keyboardType = 'phone-pad'/>
        <TextInputField model={ model } name="institution_name" label="Institution name" />
        <TextInputField model={ model } name="institution_address" label="Institution address"/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => saveAndSubmit() } title="Save and Submit"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}

/*
<TextInputField model={ user } name="name_of_institution" label="Name &amp; Address of Institution" />
<TextInputField model={ user } name="institution_address" label="Address of Institution" />
<TextInputField model={ user } name="institution_code" label="Institution code" />
<TextInputField model={ user } name="institution_contact" label="Institution contact" />
*/
