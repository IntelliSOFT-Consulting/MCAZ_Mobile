import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'
import SelectOneField from '../components/SelectOneField'
import SelectMultipleField from '../components/SelectMultipleField'

import { BOOLEAN_OPTIONS, BOOLEAN_UNKNOWN_OPTIONS } from '../../utils/FieldOptions'

export default class SectionGScene extends PureComponent {

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
        <SelectOneField model={ model } name="similar_events" options={ BOOLEAN_UNKNOWN_OPTIONS } label="Were any similar events reported within a time period similar to when the adverse event occurred and in the same locality?"  onChange={this.onChange} />
        <TextInputField model={ model } name="similar_events_describe" label="If yes, describe:" multiline={true} numberOfLines={4} onChange={this.onChange} />
        <TextInputField model={ model } name="similar_events_episodes" label="If yes, how many events/episodes?" multiline={true} numberOfLines={4} keyboardType="numeric" onChange={this.onChange} />
        <Text>Of those affected, how many are </Text>
        <TextInputField model={ model } name="affected_vaccinated" label="Vaccinated:" keyboardType="numeric" onChange={this.onChange} />
        <TextInputField model={ model } name="affected_not_vaccinated" label="Not vaccinated:" keyboardType="numeric" onChange={this.onChange} />
        <TextInputField model={ model } name="affected_unknown" label="Unknown:" keyboardType="numeric" onChange={this.onChange} />
        <TextInputField model={ model } name="community_comments" label="Other comments:" multiline={true} numberOfLines={4} onChange={this.onChange} />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue(8) } title="Save changes" />
          <Button onPress={ () => cancel() } title="Close" />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
