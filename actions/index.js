import { SAVE_DRAFT_REPORT, REMOVE_DRAFT_REPORT, SAVE_COMPLETED_REPORT, REMOVE_COMPLETED_REPORT,
 SAVE_UPLOADED_REPORT, REMOVE_UPLOADED_REPORT, SET_REPORT_FILTER, CHANGE_CONNECTION_STATUS, SAVE_ERROR }  from './actionTypes'

import { MAIN_URL } from '../utils/Constants'
import { getRequestPayload } from '../utils/utils'

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
      body: JSON.stringify(getRequestPayload(data))
    }).then(response => response.json()).then((json) => {
      if(json.sadr) {
        json.sadr.sadr.id = json.sadr.id
        dispatch(saveUploaded(json.sadr.sadr))
        dispatch(removeCompleted(json.sadr.sadr))
        //dispatch(setNotification({ message : messages.datauploaded, level: "info", id: new Date().getTime() }))
      } else if(json.adr) {
        json.adr.adr.id = json.adr.id
        dispatch(saveUploaded(json.adr.adr))
        dispatch(removeCompleted(json.adr.adr))
        //dispatch(setNotification({ message : messages.datauploaded, level: "info", id: new Date().getTime() }))
      } else if(json.aefi) {
        json.aefi.aefi.id = json.aefi.id
        dispatch(saveUploaded(json.aefi.aefi))
        dispatch(removeCompleted(json.aefi.aefi))
        //dispatch(setNotification({ message : messages.datauploaded, level: "info", id: new Date().getTime() }))
      } else if(json.saefi) {
        json.saefi.saefi.id = json.saefi.id
        dispatch(saveUploaded(json.saefi.saefi))
        dispatch(removeCompleted(json.saefi.saefi))
        //dispatch(setNotification({ message : messages.datauploaded, level: "info", id: new Date().getTime() }))
      }

    }).catch((error) => {
      dispatch(saveError(error))
    })
  }
}

export const uploadCompletedReports = (data) => (
  { type : "" }
)
