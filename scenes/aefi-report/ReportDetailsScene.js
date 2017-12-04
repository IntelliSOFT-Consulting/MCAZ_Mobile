import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'

import { BOOLEAN_OPTIONS } from '../../utils/FieldOptions'

export default class ReportDetailsScene extends PureComponent {
  state = {}

  render() {
    const { model, saveAndContinue, saveAndSubmit, cancel } = this.props
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text>First decision making level to complete (District level):</Text>
        <DateTimeInput label="Date report received at district level (DD/MM/YYYY):" name="district_receive_date" model={ model } maxDate={ new Date() }/>
        <SelectOneField label="Investigation needed:" options={ BOOLEAN_OPTIONS } name="investigation_needed" model={ model }/>
        <DateTimeInput label="If yes, date investigation planned (DD/MM/YYYY):" name="investigation_date" model={ model }/>
        <Text>National level to complete:</Text>
        <DateTimeInput label="Date report received at national level (DD/MM/YYYY):" name="national_receive_date" model={ model } maxDate={ new Date() }/>
        <TextInputField label="Comments:" name="comments" model={ model }/>
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => saveAndSubmit() } title="Save and Submit"/>
          <Button onPress={ () => cancel() } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
