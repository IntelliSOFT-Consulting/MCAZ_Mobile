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
      <TextInputField key={`lab_test-0-${name}`} name="lab_test" model={ model[name][index]} hideLabel={true} onChange={(value) => this.onChange(value, index)} />,
      <TextInputField key={`abnormal_result-1-${name}`} name="abnormal_result" model={ model[name][index] } hideLabel={true} onChange={(value) => this.onChange(value, index)} />,
      <TextInputField key={`site_normal_range-2-${name}`} name="site_normal_range" model={ model[name][index] } hideLabel={true} onChange={(value) => this.onChange(value, index)} />,
      <DateTimeInput key={`collection_date-3-${name}`} name="collection_date" model={ model[name][index] } hideLabel={true} onChange={(value) => this.onChange(value, index)} />,
      <TextInputField key={`lab_value-4-${name}`} name="lab_value" model={ model[name][index] } hideLabel={true} onChange={(value) => this.onChange(value, index)} />,
      <DateTimeInput key={`lab_value_date-5-${name}`} name="lab_value_date" model={ model[name][index] } hideLabel={true} onChange={(value) => this.onChange(value, index)} />,
      <Button key={ `vaccine_name-0-${name}` } title="-" onPress={ () => this.removeRow(index) } />
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
      <ReadOnlyDataRenderer key={`lab_test-0-readonly-${name}`} name="lab_test" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={`abnormal_result-1-readonly-${name}`} name="abnormal_result" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={`site_normal_range-2-readonly-${name}`} name="site_normal_range" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={`collection_date-3-readonly-${name}`} name="collection_date" model={ model[name][index] } type="date"/>,
      <ReadOnlyDataRenderer key={`lab_value-4-readonly-${name}`} name="lab_value" model={ model[name][index] }/>,
      <ReadOnlyDataRenderer key={`lab_value_date-5-readonly-${name}`} name="lab_value_date" model={ model[name][index] } type="date"/>
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
