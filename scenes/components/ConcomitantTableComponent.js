import React, { Component } from 'react';
import TableComponent  from './TableComponent'
import { Text, View, TextInput, ScrollView, Button, Alert, CheckBox } from 'react-native'
import TextInputField from './TextInputField'
import DateTimeInput from './DateTimeInput'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class ConcomitantTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    this.getRow = this.getRow.bind(this)
  }

  getHeader() {
    const headers = ['Name of drug', 'Date Started', 'Date Stopped', ''];
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
      <TextInputField key={Math.floor(Math.random() * 10000) } name="brand_name" model={ model[name][index] } />,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="batch_number" model={ model[name][index] }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="batch_number" model={ model[name][index] }/>,
      <Button key={ Math.floor(Math.random() * 10000) } title="-" onPress={ () => this.removeRow(index) } />
    ]
    return row
  }

  render() {
    const { label } = this.props
    const widthArr = [120, 120, 120, 30]
    const headerEls = this.getHeader()
    const rows = this.initializeRows()
    return (
      <View>
        <Text style={ AppStyles.boldText }>{ label }</Text>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={ headerEls } style={ AppStyles.tableHead } textStyle={ AppStyles.tableHeadText } widthArr={ widthArr }/>
            <Rows data={ rows }  widthArr={widthArr}/>
          </Table>
        </ScrollView>
        <Button onPress={this.addRow} title="Add row" />
      </View>
    )
  } //color="#841584"
}
