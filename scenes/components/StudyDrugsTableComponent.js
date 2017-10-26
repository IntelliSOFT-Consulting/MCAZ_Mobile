import React, { Component } from 'react';
import { Text, View, TextInput, ScrollView, Button, Alert, CheckBox } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import SelectOneField from './SelectOneField'

import AppStyles from '../../styles/AppStyles'


export default class StudyDrugsTableComponent extends Component {

  constructor(props) {
    super(props)
    const { value, name, data } = this.props
    this.state = { rows : [] }
    this.addRow = this.addRow.bind(this)
    this.removeRow = this.removeRow.bind(this)
    this.getRow = this.getRow.bind(this)
  }

  /**
    Adds a new row to the table.
  */
  addRow() {
    var rows = this.state.rows
    const index = rows.length

    rows.push(this.getRow(index))
    this.setState({ rows : rows })
  }

  /**
    Returns a new row for the given index
  */
  getRow(index) {
    var row = [
      <TextInput key={Math.floor(Math.random() * 10000) }/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <TextInput key={Math.floor(Math.random() * 10000)}/>,
      <SelectOneField options={ ["Yes", "No"] } key={Math.floor(Math.random() * 10000)}/>,
      <CheckBox key={Math.floor(Math.random() * 10000)}/>,
      <Button key={ Math.floor(Math.random() * 10000) } title="-" onPress={ () => this.removeRow(index) } />
    ]
    return row
  }

  /**
    Removes a row from the table.
    This function then recreates all the rows.
    This ensures that the delete button gets the new correct index.
  */
  removeRow(index) {
    var rows = this.state.rows
    rows.splice(index, 1)
    const length = rows.length
    var newRows = []
    var i = 0
    while(i < length) {
      newRows.push(this.getRow(i))
      i++
    }
    this.setState({ rows : newRows })
  }

  render() {
    const { label } = this.props
    const tableHead = ['Drug/Device/Vaccine', 'Dose', 'Route', 'Schedule', 'Date commenced', "Taking drug at onset of SAE", 'Relationsip of SAE to drug', ""];
    const widthArr = [120, 120, 120, 120, 120, 120, 120, 30]
    return (
      <View>
        <ScrollView horizontal={true}>
          <Table>
            <Row data={tableHead} style={AppStyles.tableHead} textStyle={AppStyles.tableHeadText} widthArr={widthArr}/>
            <Rows data={ this.state.rows }  widthArr={widthArr}/>
          </Table>
        </ScrollView>
        <Button onPress={this.addRow} title="Add row" color="#841584" />
      </View>
    )
  }
}
