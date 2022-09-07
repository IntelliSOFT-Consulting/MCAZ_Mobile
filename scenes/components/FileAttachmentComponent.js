import React, { Component } from 'react';
import TableComponent  from './TableComponent'
import { Text, View, TextInput, ScrollView, Button, Alert, CheckBox } from 'react-native'
import TextInputField from './TextInputField'
import FileInputComponent from './FileInputComponent'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'
import AppStyles from '../../styles/AppStyles';

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
        headerEls[i] = (
          <View style={AppStyles.tableHeaderView}>
            <Text style={AppStyles.tableHeadText}>{ headers[i]}</Text>
          </View>
        )
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

    var row = [
      <FileInputComponent key={Math.floor(Math.random() * 10000) } name="file" model={ model[name][index] } hideLabel={ true }/>,
      <TextInputField key={Math.floor(Math.random() * 10000)} name="description" model={ model[name][index] } hideLabel={true} />,
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
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000) } name="file" model={ model[name][index] } type="file" />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="description" model={ model[name][index] }/>,
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
      addRowBtn = (<Button onPress={this.addRow} title="Add file"  />)
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
