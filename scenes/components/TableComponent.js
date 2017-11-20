import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class TableComponent extends Component {

  constructor(props) {
    super(props)

    this.addRow = this.addRow.bind(this)
    this.removeRow = this.removeRow.bind(this)

    const { model, name } = this.props
    var rows = []
    if(model && model[name]) {
      rows = model[name]
    }
    this.state = { rows }
  }

  /**
    Adds a new row to the table.
  */
  addRow() {
    const { model, name } = this.props
    var { rows } = this.state
    rows.push({})
    model[name] = rows
    this.setState({ rows : rows })
  }

  /**
    Removes a row from the table.
    This function then recreates all the rows.
    This ensures that the delete button gets the new correct index.
  */
  removeRow(index) {

    var { rows } = this.state
    rows.splice(index, 1)
    const { model, name } = this.props
    model[name] = rows
    this.setState({ rows : rows })
  }

  initializeRows(readonly) {
    const { rows } = this.state
    var dataRows = []
    for(let i = 0; i < rows.length; i++) {
      dataRows[i] = readonly? this.getReadOnlyRow(i) : this.getRow(i)
    }
    return dataRows
  }
}

TableComponent.propTypes = {
  model: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
};
