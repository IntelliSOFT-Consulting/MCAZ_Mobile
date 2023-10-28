import React, { Component } from 'react';
import { Text, View, TextInput, Button } from 'react-native'
import { TextField } from 'react-native-material-textfield'

export default class ReactionsComponent extends Component {

  constructor(props) {
    super(props)
    const { connection, model, name } = this.props
    let reactions = model[name] == null ? [] : model[name]
    this.state = { connection, reactions : reactions }
    this.addReaction = this.addReaction.bind(this)
    this.removeReaction = this.removeReaction.bind(this)
    this.setModelValue = this.setModelValue.bind(this)
  }

  render() {
    const { readonly } = this.props
    if(readonly) {
      let reactions = this.state.reactions.map((reaction, index) => {
        return reaction["reaction_name"]
      })
      return(
        <View>
          <Text >
            Other Reactions?
          </Text>
          <Text className="form-group">
            { reactions.join(",") }
          </Text>
        </View>
      )
    }
    let reactions = this.state.reactions.map((reaction, index) => {
      return (
        <View key={ index }>
          <TextField {...this.props}
            label={ "Reaction" } labelHeight={ 16 }
            value={ this.state.reactions[index]['reaction_name'] } baseColor={ "rgba(0, 0, 0, .80)" }
            onChangeText={ (text) => this.handleChange(index, text) } tintColor={ "rgb(0, 145, 234)" }
          />
          <Button key={ Math.floor(Math.random() * 10000) } title="remove reaction" onPress={ () => this.removeReaction(index) } />
        </View>
      )
    })
    const addReactions = readonly? null : (
      <Button title="Add Reaction" onPress={ () => this.addReaction() } />
    )
    return(
      <View>
        <Text className="form-group">
          Other Reactions?
        </Text>
        { addReactions }
        { reactions }
      </View>
    )
  }

  addReaction() {
    let reactions = this.state.reactions
    reactions.push({ reaction_name : "" })
    this.setState({ reactions : reactions })
    this.setModelValue()
  }

  handleChange(i, value) {
    let reactions = this.state.reactions
    reactions[i] = { reaction_name : value }
    this.setState({ reactions : reactions})
    this.setModelValue()
  }

  removeReaction(i) {
    let reactions = this.state.reactions
    reactions.splice(i, 1)
    const newReaction = Object.assign([], reactions)
    this.setState({ reactions : newReaction })
    this.setModelValue()
  }

  setModelValue() {
    const { model, name } = this.props
    const { reactions } = this.state
    model[name] = reactions
  }

  componentWillReceiveProps(nextProps) {

  }
}
