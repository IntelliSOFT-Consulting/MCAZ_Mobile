import React, { Component } from 'react';
import { Text, View, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import DateTimeInput from './DateTimeInput'
import TextInputField from './TextInputField'
import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'
import TableComponent from './TableComponent'

import AppStyles from '../../styles/AppStyles'


export default class LabsTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    const { value, name, data } = this.props
    this.getRow = this.getRow.bind(this)
  }


  /**
    Returns a new row for the given index
  */
  getRow(index) {
    const { model, name } = this.props
    var row = [
      <TextInputField key={Math.floor(Math.random() * 10000)} name="lab_test" model={ model[name][index]} hideLabel={true} />,
      <TextInputField key={Math.floor(Math.random() * 10000)} name="abnormal_result" model={ model[name][index] } hideLabel={true} />,
      <TextInputField key={Math.floor(Math.random() * 10000)} name="site_normal_range" model={ model[name][index] } hideLabel={true} />,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="collection_date" model={ model[name][index] } hideLabel={true} />,
      <TextInputField key={Math.floor(Math.random() * 10000)} name="lab_value" model={ model[name][index] } hideLabel={true} />,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="lab_value_date" model={ model[name][index] } hideLabel={true} />,
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

    var row = [
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="lab_test" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="abnormal_result" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="site_normal_range" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="collection_date" model={ model[name][index] } type="date"/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="lab_value" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="lab_value_date" model={ model[name][index] } type="date"/>
    ]
    return row
  }

  render() {
    const { label, readonly } = this.props
    var tableHead = ['Lab test', 'Abnormal result', 'Site normal range', 'Collection date', 'Lab value previous or subsequent to this event', 'Collection date'];
    var widthArr = [120, 120, 120, 120, 120, 120]
    const rows = this.initializeRows(readonly)
    var addBtn = null
    if(!readonly) {
      widthArr.push(30)
      tableHead.push("")
      addBtn = ( <Button onPress={this.addRow} title="Add row" color="#841584" /> )
    }
    return (
      <View>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={tableHead} style={{...AppStyles.tableHead, ...{ height: 80 }}} textStyle={AppStyles.tableHeadText} widthArr={widthArr}/>
            <Rows data={ rows }  widthArr={widthArr}/>
          </Table>
        </ScrollView>
        { addBtn }
      </View>
    )
  }
}
