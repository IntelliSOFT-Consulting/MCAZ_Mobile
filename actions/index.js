import { SAVE_DRAFT_REPORT, REMOVE_DRAFT_REPORT, SAVE_COMPLETED_REPORT, REMOVE_COMPLETED_REPORT,
 SAVE_UPLOADED_REPORT, REMOVE_UPLOADED_REPORT, SET_REPORT_FILTER, CHANGE_CONNECTION_STATUS, SAVE_ERROR }  from './actionTypes'

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

export const changeConnection = (isConnected) => (
  { type : CHANGE_CONNECTION_STATUS,  isConnected }
)

export const saveError = (error) => {
  { type : SAVE_ERROR, error }
}

export const uploadData = (data, url) => {
  return dispatch => {
    dispatch(saveCompleted(data))
    dispatch(removeDraft(data))
    return fetch(url, {
      method : "POST",
      headers: {
        "Accept" : "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then((json) => {
      if(json.sadr) {
        data.created = json.sadr.created
        data.modified = json.sadr.modified
        data.id = json.sadr.id
        dispatch(saveUploaded(data))
        dispatch(removeDraft(data))
        dispatch(removeCompleted(data))
      }

    }).catch((error) => {
      dispatch(saveError(error))
    })
  }
}

export const uploadCompletedReports = (data) => (
  { type : "" }
)
