import React, { Component } from 'react';
import { Text, View, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import SelectOneField from './SelectOneField'
import DateTimeInput from './DateTimeInput'
import ReadOnlyDataRenderer from './ReadOnlyDataRenderer'
import TableComponent from './TableComponent'
import AppStyles from '../../styles/AppStyles'
import TextInputField from './TextInputField'
import { RELATIONSHIP_SAE } from '../../utils/FieldOptions'

export default class SAEConcomitantTableComponent extends TableComponent {

  constructor(props) {
    super(props)
    const { value, name, data } = this.props
    //this.state = { }
    this.getRow = this.getRow.bind(this)
    this.getMinStopDate = this.getMinStopDate.bind(this)
  }

  /**
    Returns a new row for the given index
  */
  getRow(index) {
    const { model, name } = this.props
    var row = [
      <TextInputField key={`drug_name-0-${name}`} name="drug_name" model={ model[name][index] } onChange={(value) => this.onChange(value, index)} />,
      <DateTimeInput key={`start_date-1-${name}`} name="start_date" model={ model[name][index] } maxDate={ new Date() } onChange={(value) => this.onChange(value, index)} />,
      <DateTimeInput key={`stop_date-2-${name}`} name="stop_date" model={ model[name][index] } maxDate={ new Date() } minDate={ this.getMinStopDate(index) }/>,
      <SelectOneField key={`relationship_to_sae-3-${name}`} name="relationship_to_sae" model={ model[name][index] } options={ RELATIONSHIP_SAE } onChange={(value) => this.onChange(value, index)}/>,
      <Button key={ `vaccine_name-0-${name}` } title="-" onPress={ () => this.removeRow(index) } />
    ]
    return row
  }

  /**
    Gets the minimum date for stop date
  */
  getMinStopDate(index) {
    const { model, name } = this.props
    const data = model[name][index]
    if(data && data['start_date']) {
      if(typeof data['start_date'] == "string") {
        const v = data['start_date'].split("-")
        value = new Date();
        value.setDate(v[0])
        value.setMonth(parseInt(v[1]) - 1)
        value.setYear(v[2])
        return value
      }
    }
    return undefined
  }

  /**
    Returns a new row for the given index.
    It checks the for data within the given index and sets it.
  */
  getReadOnlyRow(index) {
    const rowData = {}
    const { model, name } = this.props

    var row = [
      <ReadOnlyDataRenderer key={`drug_name-0-readonly-${name}`} name="drug_name" model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={`start_date-1-readonly-${name}`} name="start_date" model={ model[name][index] } type="date"/>,
      <ReadOnlyDataRenderer key={`stop_date-2-readonly-${name}`} name="stop_date" model={ model[name][index] } type="date"/>,
      <ReadOnlyDataRenderer key={`suspected_drug-3-readonly-${name}`} name="suspected_drug" model={ model[name][index] } options={ RELATIONSHIP_SAE } type="option"/>,
    ]
    return row
  }

  render() {
    const { label, readonly } = this.props
    var tableHead = ['Concomitant medication', 'Date started', 'Date stopped', 'Relationship of SAE to medication'];
    var widthArr = [120, 120, 120, 120]
    const rows = this.initializeRows(readonly)
    var addBtn = null
    if(!readonly) {
      widthArr.push(30)
      tableHead.push("")
      addBtn = ( <Button onPress={this.addRow} title="Add row" color="#841584" /> )
    }
    return (
      <View style={ AppStyles.tableView }>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={ tableHead } style={{...AppStyles.tableHead, ...{ height: 60 }}} textStyle={AppStyles.tableHeadText} widthArr={widthArr}/>
            <Rows data={ rows }  widthArr={ widthArr }/>
          </Table>
        </ScrollView>
        { addBtn }
      </View>
    )
  }
}
