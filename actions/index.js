import { SAVE_DRAFT_REPORT, REMOVE_DRAFT_REPORT, SAVE_COMPLETED_REPORT, REMOVE_COMPLETED_REPORT,
 SAVE_UPLOADED_REPORT, REMOVE_UPLOADED_REPORT, SET_REPORT_FILTER, CHANGE_CONNECTION_STATUS }  from './actionTypes'

import { MAIN_URL } from '../utils/Constants'

/**
  Saves a draft report
*/
export const saveDraft = (data) => (
  { type : SAVE_DRAFT_REPORT, data }
)

export const removeDraft = (data) => (
  { type : REMOVE_DRAFT_REPORT, data }
)

export const saveCompleted = (data) => (
  { type : SAVE_COMPLETED_REPORT, data }
)

export const removeCompleted = (data) => (
  { type : REMOVE_COMPLETED_REPORT, data }
)

export const saveUploaded = (data) => (
  { type : SAVE_UPLOADED_REPORT, data }
)

export const removeUploaded = (data) => (
  { type : REMOVE_UPLOADED_REPORT, data }
)

export const setReportFilter = (filter) => (
  { type : SET_REPORT_FILTER, filter }
)

export const changeConnection = (status) => (
  { type : CHANGE_CONNECTION_STATUS, { isConnected : status }}
)

export const uploadData = (data, ) => {
  return dispatch => {
    dispatch(saveCompleted(data))
    return fetch(MAIN_URL, {
      method : "POST",
      headers: {
        "Accept" : "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then((json) => {
      if(json.sadr) {
        dispatch(saveUploaded(json.sadr))
        dispatch(removeDraft(json.sadr))
        dispatch(removeCompleted(json.sadr))
      }
      console.log(json)
    })
  }
}
