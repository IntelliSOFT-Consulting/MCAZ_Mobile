import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default class AutoCompleteTextInput extends Component {

  constructor(props, context) {
    super(props, context)
    const { data, nameKey, value } = this.props
    this.state = { value : "", data: data, results: [] }
    if(data.length > 0) {
      const first = data[0]
      if(typeof first == "object") {
        this.nameKey = nameKey == null? "name" : nameKey
      }
    }
    this.state = { value : value }
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({item}) => {
    var label = this._getLabel(item)

    return (<TouchableOpacity onPress={ () => this._onPress(item) }>
        <View style={ styles.rowItemStyle }>
          <Text style={{ color: '#000' }}>
            { label }
          </Text>
        </View>
      </TouchableOpacity>
    )
  };

  _getLabel = (item) => {
    if(typeof item == "object") {
      const { nameKey } = this.props
      const label = nameKey == null? item['name'] : item[nameKey]
      return label
    }
    return item
  }

  _onPress = (item) => {
    const { onItemPress } = this.props
    if(onItemPress) {
      onItemPress(item)
    }
    this.setState({ value : this._getLabel(item), results: [] })
  }

  _renderSeparator = () => {
    return (
      <View
        style={ styles.separator }
      />
    );
  };

  onKeyInput = (text) => {
    const inputLength = text.length
    var results = []
    if(this.nameKey != null) {
      results = inputLength === 0 ? [] : this.state.data.filter(lang =>
        lang[this.nameKey].toLowerCase().slice(0, inputLength) === text.toLowerCase()
      );
    } else {
      results = inputLength === 0 ? [] : this.state.data.filter(lang =>
        lang.toLowerCase().slice(0, inputLength) === text.toLowerCase()
      );
    }
    if(results.length == 0 && inputLength > 0) {
      const { onItemPress } = this.props
      onItemPress(text)
    }
    this.setState({ value : text, results: results })
  }

  render() {
    //var data = ['a', 'b','c']
    return (
      <View style={styles.container}>
        <TextInput placeholder="Enter texts" value={ this.state.value }
         onChangeText={ (text) => this.onKeyInput(text) }/>
        <FlatList
          data={ this.state.results }
          keyExtractor={ this._keyExtractor }
          renderItem={ this._renderItem }
          ItemSeparatorComponent={ this._renderSeparator }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    backgroundColor: '#ecf0f1',
  },
  rowItemStyle: {
    zIndex: 999,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    opacity: 0.8,
    borderTopColor: 'lightgrey',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  separator : {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE"
  }
});
