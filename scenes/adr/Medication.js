import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import MedicationTableComponent from '../components/MedicationTableComponent'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import ConcomitantTableComponent from '../components/ConcomitantTableComponent'

import AppStyles from '../../styles/AppStyles'

import { OUTCOME, ACTION_TAKEN, RELATEDNESS_TO_ADR } from '../../utils/FieldOptions'

export default class Medication extends PureComponent {
  constructor(props, context) {
    super(props, context);
    const { model } = props;
    this.state = { model }
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    const { model } = this.state;
    const newModel = {...model, ...value};
    this.setState({ model: newModel }, () => {
      this.props.handleModelChange(value);
    });
  }

  render() {
    const { saveAndContinue, cancel } = this.props;
    const { model } = this.state;
    return (
      <KeyboardAwareScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ] } keyboardShouldPersistTaps={'handled'}>
        <Text style={ AppStyles.boldText }>Current Medication</Text>
        <MedicationTableComponent
          model={ model }
          name="sadr_list_of_drugs"
          onChange={ this.onChange }
        />

        <SelectOneField
          model={ model }
          label="Action taken:"
          name="action_taken"
          options={ ACTION_TAKEN }
          onChange={ this.onChange }
        />
        <SelectOneField
          model={ model }
          name="outcome"
          label="Outcome of ADR:"
          options={ OUTCOME }
          onChange={ this.onChange }
        />
        <SelectOneField
          model={ model }
          name="relatedness"
          label="Relatedness of suspected medicine(s) to ADR:"
          options={ RELATEDNESS_TO_ADR }
          onChange={ this.onChange }
        />
        <FileAttachmentComponent
          model={ model }
          name="attachments"
          label="Attach any files"
          onChange={ this.onChange }
        />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(4) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

// <ConcomitantTableComponent model={ model } name="sadr_other_drugs" label="Concomitant (Other) drugs taken, including herbal medicines & Dates/period taken:"/>
