import React, { PureComponent } from 'react';

import { View, ScrollView, Text, Button } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TextInputField from '../components/TextInputField'


export default class SectionHScene extends PureComponent {

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
    const { saveAndContinue, saveAndSubmit, cancel, validate } = this.props
    const { model } = this.state;
    return (
      <KeyboardAwareScrollView style={ [AppStyles.scrollContainer, AppStyles.aefiBackground] } keyboardShouldPersistTaps={'handled'}>
        <TextInputField name="relevant_findings" label="Other relevant findings/observations/comments" multiline={true} numberOfLines={4} model={model} onChange={this.onChange} />
        <View style={ AppStyles.rowButtons }>
          <Button onPress={ () => saveAndContinue() } title="Save changes"/>
          <Button onPress={ () => saveAndSubmit() } title="Save and Submit"/>
          <Button onPress={ () => cancel() } title="Close"/>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
