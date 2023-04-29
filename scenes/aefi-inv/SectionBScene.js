import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import { BOOLEAN_UNKNOWN_OPTIONS, INFANT_BIRTH_OPTS, DELIVERY_OPTS } from '../../utils/FieldOptions'

export default class SectionBScene extends PureComponent {

  constructor(props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
    const { model } = this.props
    this.state = { model }
  }

  onChange(value) {
    this.setState((prevState) => ({
      model: {...prevState.model, ...value}
    }), () => {
      this.props.handleModelChange(this.state.model)
    })
  }

  render() {
    const { saveAndContinue, cancel, validate } = this.props
    const { model } = this.state;
    return (
      <KeyboardAwareScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] } keyboardShouldPersistTaps={'handled'}>
        <SelectOneField label="Past history of similar event" model={ model } name="past_history" options={ BOOLEAN_UNKNOWN_OPTIONS } onChange={this.onChange} />
        <TextInputField label="Remarks (If yes provide details)" model={ model } name="past_history_remarks" onChange={this.onChange} />
        <SelectOneField label="Adverse event after previous vaccination(s)" model={ model } name="adverse_event" options={ BOOLEAN_UNKNOWN_OPTIONS} onChange={this.onChange} />
        <TextInputField label="Remarks (If yes provide details)" model={ model } name="adverse_event_remarks" onChange={this.onChange} />
        <SelectOneField label="History of allergy to vaccine, drug or food" model={ model } name="allergy_history" options={ BOOLEAN_UNKNOWN_OPTIONS} onChange={this.onChange} />
        <TextInputField label="Remarks (If yes provide details)" model={ model } name="allergy_history_remarks" onChange={this.onChange} />

        <SelectOneField label="Pre-existing comorbidity/ congenital disorder?" model={ model } name="comorbidity_disorder" options={ BOOLEAN_UNKNOWN_OPTIONS} onChange={this.onChange} />
        <TextInputField label="Remarks (If yes provide details)" model={ model } name="comorbidity_disorder_remarks"/>
        <SelectOneField label="Pre-existing acute illness (30 days) prior to vaccination?" model={ model } name="existing_illness" options={ BOOLEAN_UNKNOWN_OPTIONS} onChange={this.onChange} />
        <TextInputField label="Remarks (If yes provide details)" model={ model } name="existing_illness_remarks"/>
        <SelectOneField label="Has the patient tested Covid19 positive prior to vaccination?" model={ model } name="covid_positive" options={ BOOLEAN_UNKNOWN_OPTIONS} onChange={this.onChange} />
        <TextInputField label="Remarks (If yes provide details)" model={ model } name="covid_positive_remarks"/>

        <SelectOneField label="History of hospitalization in last 30 days, with cause" model={ model } name="hospitalization_history" options={ BOOLEAN_UNKNOWN_OPTIONS} onChange={this.onChange} />
        <TextInputField label="Remarks (If yes provide details)" model={ model } name="hospitalization_history_remarks" onChange={this.onChange} />
        
        <SelectOneField label="Was the patient receiving any concomitant medication?" model={ model } name="medication_vaccination" options={ BOOLEAN_UNKNOWN_OPTIONS} onChange={this.onChange} />
        <TextInputField label="Remarks (If yes, name the drug, indication, doses & treatment dates)" model={ model } name="medication_vaccination_remarks" onChange={this.onChange} />

        <SelectOneField label="Was patient on medication at time of vaccination? (If yes, name the drug, indication, doses &amp; treatment dates)" model={ model } name="medication_vaccination" options={ BOOLEAN_UNKNOWN_OPTIONS} onChange={this.onChange} />
        <TextInputField label="Remarks (If yes provide details)" multiline = {true} model={ model } name="medication_vaccination_remarks"
          numberOfLines = {4} onChange={this.onChange} />
        <SelectOneField label="Did patient consult faith healers before/after vaccination? *specify" model={ model } name="faith_healers" options={ BOOLEAN_UNKNOWN_OPTIONS} onChange={this.onChange} />
        <TextInputField label="Remarks (If yes provide details)" model={ model } name="faith_healers_remarks" onChange={this.onChange} />
        <SelectOneField label="Family history of any disease (relevant to AEFI) or allergy" options={ BOOLEAN_UNKNOWN_OPTIONS} model={ model } name="family_history" onChange={this.onChange} />
        <TextInputField label="Remarks (If yes provide details)" model={ model } name="family_history_remarks" onChange={this.onChange} />
        <Text>For adult women</Text>
        <SelectOneField label="Currently pregnant?" model={ model } name="pregnant" options={ BOOLEAN_UNKNOWN_OPTIONS } onChange={this.onChange} />
        <TextInputField label="(weeks)" model={ model } name="pregnant_weeks" keyboardType="numeric"/>
        <SelectOneField label="Currently breastfeeding?" model={ model } name="breastfeeding" options={ BOOLEAN_UNKNOWN_OPTIONS } onChange={this.onChange} />
        <Text>For infants</Text>
        <SelectOneField label="The birth was" model={ model } name="infant" options={ INFANT_BIRTH_OPTS } onChange={this.onChange} />
        <TextInputField label="Birth weight:" model={ model } name="birth_weight" keyboardType="numeric" onChange={this.onChange} />
        <SelectOneField label="Delivery procedure was:" model={ model } name="delivery_procedure" options={ DELIVERY_OPTS } onChange={this.onChange} />
        <TextInputField label="Specify:" model={ model } name="delivery_procedure_specify" onChange={this.onChange} />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(3) } title="Save changes"/>
          <Button onPress={ () => cancel() } title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
