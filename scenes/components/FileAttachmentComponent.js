import React, { Component } from 'react';
import TableComponent  from './TableComponent'
import { Text, View, TextInput, ScrollView, Button, Alert, CheckBox } from 'react-native'
import TextInputField from './TextInputField'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'

export default class FileAttachmentComponent extends TableComponent {

  constructor(props) {
    super(props)
    this.getRow = this.getRow.bind(this)
  }

  getHeader() {
    const { readonly } = this.props
    const headers = ['File', 'Description', ''];
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
      headerEls.splice(2)
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
      <TextInputField key={Math.floor(Math.random() * 10000)} name="batch_number" model={ model[name][index] }/>,
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
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000) } name="brand_name" model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="batch_number" model={ model[name][index] }/>,
    ]
    return row
  }

  render() {
    const { label, readonly } = this.props
    const widthArr = [120, 120]
    const flexArr=[2, 4, 2]
    const headerEls = this.getHeader()
    const rows = this.initializeRows(readonly)
    var addRowBtn = null
    if(!readonly) {
      widthArr.push(30)
      addRowBtn = (<Button onPress={this.addRow} title="Add row"  />)
    }
    return (
      <View>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={ headerEls } style={ AppStyles.tableHead } textStyle={ AppStyles.tableHeadText } widthArr={ widthArr }/>
            <TableWrapper style={{flexDirection: 'row'}}>
              <Rows data={ rows }  widthArr={ widthArr }/>
            </TableWrapper>
          </Table>
        </ScrollView>
        { addRowBtn }
      </View>
    )
  } //color="#841584"
}
