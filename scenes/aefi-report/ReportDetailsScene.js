import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

export default class ReportDetailsScene extends PureComponent {

  render() {
    return (
      <ScrollView style={ AppStyles.scrollContainer }>
        <Text>First decision making level to complete (District level):</Text>
        <TextInputField label="Date report received at district level (DD/MM/YYYY):" />
        <SelectOneField label="Investigation needed:" options={ ["one", "two"]}/>
        <TextInputField label="If yes, date investigation planned (DD/MM/YYYY):" />
        <Text>National level to complete:</Text>
        <TextInputField label="Date report received at national level (DD/MM/YYYY):" />
        <TextInputField label="Comments:" />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ this.saveAndContinue } title="Save changes"/>
          <Button onPress={ this.saveAndSubmit } title="Save and Submit"/>
          <Button onPress={ this.cancel } title="Cancel"/>
        </View>
      </ScrollView>
    )
  }
}
