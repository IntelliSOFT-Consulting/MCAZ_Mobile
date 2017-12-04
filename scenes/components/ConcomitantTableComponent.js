import React, { Component } from 'react';
import TableComponent  from './TableComponent'
import { Text, View, TextInput, ScrollView, Button, Alert } from 'react-native'
import TextInputField from './TextInputField'
import DateTimeInput from './DateTimeInput'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import CheckBoxInput from './CheckBoxInput'

import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'

export default class ConcomitantTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    this.getRow = this.getRow.bind(this)
  }

  getHeader() {
    const { readonly } = this.props
    const headers = ['Name of drug', 'Date Started', 'Date Stopped', 'Tick suspected drug(s)', ''];
    var headerEls = []
    mandatory = [] // mandatory indices
    for(let i = 0; i < headers.length; i++) {
      if(mandatory.indexOf(i) != -1) {
        const header = (
          <Text>{ headers[i] } <Text style={ AppStyles.required }>*</Text></Text>
        )
        headerEls[i] = header
      } else {
        headerEls[i] = headers[i]
      }
    }
    if(readonly) {
      headerEls.splice(4)
    }
    return headerEls
  }

  /**
    Returns a new row for the given index.
    It checks the for data within the given index and sets it.
  */
  getRow(index) {
    const rowData = {}
    const { model, name } = this.props
    if(!model[name]) {
      model[name] = []
    }
    if(!model[name][index]) {
      model[name][index] = rowData
    }
    var row = [
      <TextInputField key={Math.floor(Math.random() * 10000) } name="drug_name" model={ model[name][index] } />,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="start_date" model={ model[name][index] }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="stop_date" model={ model[name][index] }/>,
      <CheckBoxInput key={Math.floor(Math.random() * 10000)} name="suspected_drug" model={ model[name][index] }/>,
      <Button key={ Math.floor(Math.random() * 10000) } title="-" onPress={ () => this.removeRow(index) } />
    ]
    return row
  }

  /**
    Returns a new row for the given index.
    It checks the for data within the given index and sets it.
  */
  getReadOnlyRow(index) {
    const rowData = {}
    const { model, name } = this.props
    if(!model[name]) {
      model[name] = []
    }
    if(!model[name][index]) {
      model[name][index] = rowData
    }
    var row = [
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000) } name="drug_name"  model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="start_date" type="date" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="stop_date" type="date" model={ model[name][index] }/>,
      <CheckBoxInput key={Math.floor(Math.random() * 10000)} name="suspected_drug" model={ model[name][index] } readonly={ true }/>,
    ]
    return row
  }

  render() {
    const { label, readonly } = this.props
    var widthArr = [150, 120, 120, 120]
    const headerEls = this.getHeader()
    const rows = this.initializeRows()
    var addRowBtn = null
    if(!readonly) {
      addRowBtn = (<Button onPress={this.addRow} title="Add row"  />)
      widthArr.push(30)
    }
    return (
      <View style={ AppStyles.tableView }>
        <Text style={ AppStyles.boldText }>{ label }</Text>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={ headerEls } style={ AppStyles.tableHead } textStyle={ AppStyles.tableHeadText } widthArr={ widthArr }/>
            <Rows data={ rows }  widthArr={widthArr}/>
          </Table>
        </ScrollView>
        { addRowBtn }
      </View>
    )
  } //color="#841584"
}
