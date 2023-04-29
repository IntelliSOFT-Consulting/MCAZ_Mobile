import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'
import FileAttachmentComponent from '../components/FileAttachmentComponent'
import DateTimeInput from '../components/DateTimeInput'

import { SOURCE_INFO } from '../../utils/FieldOptions'

export default class SectionCScene extends PureComponent {

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
        <SelectOneField label="Source of information" model={ model } name="source_examination" options={ SOURCE_INFO } onChange={this.onChange} />
        <TextInputField label="Other" model={ model } name="source_other_specify" onChange={this.onChange} />
        <TextInputField label="If from verbal autopsy, please mention source" model={ model } name="verbal_source" onChange={this.onChange} />
        <TextInputField label="Name of the person who first examined/treated the patient:" model={ model } name="examiner_name" onChange={this.onChange} />
        <TextInputField label="Other sources who provided information (specify):" model={ model } name="other_sources" onChange={this.onChange} />
        <TextInputField label="Signs and symptoms in chronological order from the time of vaccination:" model={ model } name="signs_symptoms"  onChange={this.onChange} />
        <TextInputField label="Name and contact information of person completing these clinical details:" model={ model } name="person_details" onChange={this.onChange} />
        <TextInputField label="Designation:" model={ model } name="person_designation" onChange={this.onChange} />
        <DateTimeInput label="Date/time" model={ model } name="person_date" onChange={this.onChange} />
        <Text style={ AppStyles.boldText }>
          **Instructions – Attach copies of ALL available documents (including case sheet, discharge summary, case notes,
          laboratory reports and autopsy reports, prescriptions for concomitant medication) and then complete additional information NOT AVAILABLE in
          existing documents, i.e.
        </Text>
        <Text>If patient has received medical care  attach copies of all available documents (including case sheet, discharge
          summary, laboratory reports and autopsy reports, if available) and write only the information that is not
          available in the attached documents below
        </Text>
        <TextInputField label="" model={ model } name="medical_care" onChange={this.onChange} />
        <Text>
          If patient has not received medical care – obtain history, examine the patient and write down your findings below (add
          additional sheets if necessary)
        </Text>
        <TextInputField label="" model={ model } name="not_medical_care" onChange={this.onChange} />
        <FileAttachmentComponent model={ model } name="attachments"  onChange={this.onChange} />
        <TextInputField label="Provisional / Final diagnosis:" model={ model } name="final_diagnosis" onChange={this.onChange} />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(4) } title="Save changes" />
          <Button onPress={ () => cancel() } title="Close" />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
