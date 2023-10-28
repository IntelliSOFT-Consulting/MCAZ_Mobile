import React, { PureComponent } from 'react';

import { View, ScrollView, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import AppStyles from '../../styles/AppStyles'
import { DESIGNATION } from '../../utils/FieldOptions'

export default class ReporterDetailsScene extends PureComponent {

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
    const { saveAndContinue, cancel, saveAndSubmit, user } = this.props;
    const { model } = this.state;
    return (
      <KeyboardAwareScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ]  } keyboardShouldPersistTaps={'handled'}>
        <TextInputField
          model={ model }
          name="reporter_name"
          label="Reporter name: "
          required={ true }
          onChange={ this.onChange }
        />
        <SelectOneField
          model={ model }
          name="designation_id"
          label="Designation"
          options={ DESIGNATION }
          required={ true }
          onChange={ this.onChange }
        />
        <TextInputField
          model={ model }
          name="reporter_email"
          label="Reporter email "
          keyboardType = 'email-address'
          required={ true }
          onChange={ this.onChange }
        />
        <TextInputField
          model={ model }
          name="reporter_phone"
          label="Reporter phone"
          keyboardType = 'phone-pad'
          onChange={ this.onChange }
        />
        <TextInputField
          model={ model }
          name="institution_name"
          label="Institution name"
          onChange={ this.onChange }
        />
        <TextInputField
          model={ model }
          name="institution_address"
          label="Institution address"
          onChange={ this.onChange }
        />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => saveAndSubmit() } title="Save and Submit"/>
          <Button onPress={ () => cancel() } title='Close' />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

/*
<TextInputField model={ user } name="name_of_institution" label="Name &amp; Address of Institution" />
<TextInputField model={ user } name="institution_address" label="Address of Institution" />
<TextInputField model={ user } name="institution_code" label="Institution code" />
<TextInputField model={ user } name="institution_contact" label="Institution contact" />
*/
