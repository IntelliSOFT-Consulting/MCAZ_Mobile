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
    this.onChange = this.onChange.bind(this)
  }

  /**
    Returns a new row for the given index
  */
  getRow(index) {
    const { model, name } = this.props
    var row = [
      <TextInputField key={Math.floor(Math.random() * 10000)} name="drug_name" model={ model[name][index] }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="start_date" model={ model[name][index] } maxDate={ new Date() } onChange={ this.onChange }/>,
      <DateTimeInput key={Math.floor(Math.random() * 10000)} name="stop_date" model={ model[name][index] } maxDate={ new Date() } minDate={ this.getMinStopDate(index) }/>,
      <SelectOneField key={Math.floor(Math.random() * 10000)} name="relationship_to_sae" model={ model[name][index] } options={ RELATIONSHIP_SAE }/>,
      <Button key={ Math.floor(Math.random() * 10000) } title="-" onPress={ () => this.removeRow(index) } />
    ]
    return row
  }

  onChange(value, index) {
    var { start_dates } = this.getState()
    if(start_dates == null) {
      start_dates = []
    }
    start_dates[index] = value
    this.updateState({ start_dates : start_dates })
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
        value.setMonth(parseInt(v[1]))
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
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="drug_name" model={ model[name][index] } />,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="start_date" model={ model[name][index] } type="date"/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="stop_date" model={ model[name][index] } type="date"/>,
      <ReadOnlyDataRenderer key={Math.floor(Math.random() * 10000)} name="suspected_drug" model={ model[name][index] } options={ RELATIONSHIP_SAE } type="option"/>,
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
            <Row data={ tableHead } style={AppStyles.tableHead} textStyle={AppStyles.tableHeadText} widthArr={widthArr}/>
            <Rows data={ rows }  widthArr={ widthArr }/>
          </Table>
        </ScrollView>
        { addBtn }
      </View>
    )
  }
}
