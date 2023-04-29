import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import DateTimeInput from '../components/DateTimeInput'
import CheckBoxInput from '../components/CheckBoxInput';
import ReactionsComponent from '../components/ReactionsComponent'

import { SEVERITY_REASON, BOOLEAN_OPTIONS } from '../../utils/FieldOptions'

export default class AdverseReactionScene extends PureComponent {

  constructor(props, context) {
    super(props, context);
    const { model } = props;
    this.state = { model }
    this.onChange = this.onChange.bind(this)
    this.onSeverityChange = this.onSeverityChange.bind(this)
  }

  render() {
    const { saveAndContinue, cancel } = this.props;
    const { model } = this.state;
    const severityReason = model['severity'] == 'Yes'? (<SelectOneField model={ model } name="severity_reason" label="Reason for Seriousness" options={ SEVERITY_REASON }/>) :
    null
    return (
      <KeyboardAwareScrollView style={ [ AppStyles.scrollContainer, AppStyles.adrBackground ]  } keyboardShouldPersistTaps={'handled'}>
        <Text style={ AppStyles.boldText }>Adverse Reaction</Text>
        <DateTimeInput
          model={ model }
          name="date_of_onset_of_reaction"
          label="Date of onset"
          onChange={ this.onChange }
          maxDate={ new Date() }
        />
        <DateTimeInput
          model={ model }
          name="date_of_end_of_reaction"
          label="Date of end of reaction (If ended)"
          onChange={ this.onChange }
          maxDate={ new Date() }
          minDate={ model.date_of_onset_of_reaction }
        />
        <CheckBoxInput
          model={model}
          name="in_utero"
          label={'Did reaction occur in utero?'}
          onChange={ this.onChange }
        />
        <TextInputField
          model={ model }
          name="description_of_reaction"
          label="Description of ADR"
          multiline = {true}
          numberOfLines = {4}
          onChange={ this.onChange }
         />
        <ReactionsComponent model={ model } name="reactions" onChange={this.onChange} />
        <SelectOneField
          model={ model }
          name="severity"
          label="Serious "
          options={ BOOLEAN_OPTIONS }
          onChange={ this.onSeverityChange }
        />
        { severityReason }
        <TextInputField
          model={ model }
          name="medical_history"
          label="Relevant medical history, including any allergies"
          multiline = {true}
          onChange={ this.onChange }
          numberOfLines = {4}/>
        <TextInputField
          model={ model }
          name="past_drug_therapy"
          label="Relevant Past Drug Therapy"
          multiline={true}
          numberOfLines={4}
          onChange={ this.onChange }
        />
        <TextInputField
          model={ model }
          name="lab_test_results"
          label="Laboratory test results"
          multiline={true}
          numberOfLines={4}
          onChange={ this.onChange }
        />
        <TextInputField
          model={ model }
          name="any_other_information"
          label="Any other information"
          multiline={true}
          numberOfLines={4}
          onChange={ this.onChange }
        />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(3) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }

  onChange(value) {
    const { model } = this.state;
    const newModel = {...model, ...value};
    this.setState({ model: newModel }, () => {
      this.props.handleModelChange(value);
    });
  }

  onSeverityChange(severity) {
    const { model } = this.state;
    let newModel = {};
    if (severity.severity === 'No') {
      const newModel = {};
      newModel['severity_reason'] = '';
      model['severity_reason'] = ''
      // this.props.handleModelChange(newModel);
    }
    this.setState({ model: {...model, ...newModel, ...severity} }, () => {
      this.props.handleModelChange({...severity, ...newModel});
    })
  }
}
