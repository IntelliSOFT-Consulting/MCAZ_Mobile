import { SAVE_DRAFT_REPORT, REMOVE_DRAFT_REPORT, SAVE_COMPLETED_REPORT, REMOVE_COMPLETED_REPORT,
 SAVE_UPLOADED_REPORT, REMOVE_UPLOADED_REPORT, SET_REPORT_FILTER, CHANGE_CONNECTION_STATUS, SAVE_ERROR,
 RESET_UPLOAD_STATUS, UPDATE_UPLOAD_STATUS, SET_NOTIFICATION }  from './actionTypes'

import { MAIN_URL, REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'
import { getRequestPayload, getURL } from '../utils/utils'
import messages from '../utils/messages.json'

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

export const uploadData = (data, url, updateProgress) => {
  return dispatch => {
    dispatch(saveCompleted(data))
    dispatch(removeDraft(data))
    const rid = data.rid
    const type = data.type
    return fetch(url, {
      method : "POST",
      headers: {
        "Accept" : "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getRequestPayload(data))
    }).then(response => response.json()).then((json) => {
      console.log(json)
      console.log(rid)
      console.log(type)
      if(json.sadr) {
        json.sadr.rid = rid
        json.sadr.type = REPORT_TYPE_ADR
        dispatch(saveUploaded(json.sadr))
        dispatch(removeCompleted(json.sadr))
      } else if(json.adr) {
        json.adr.rid = rid
        json.adr.type = REPORT_TYPE_SAE
        dispatch(saveUploaded(json.adr))
        dispatch(removeCompleted(json.adr))
      } else if(json.aefi) {
        json.aefi.rid = rid
        json.aefi.type = REPORT_TYPE_AEFI
        dispatch(saveUploaded(json.aefi))
        dispatch(removeCompleted(json.aefi))
      } else if(json.saefi) {
        //json.saefi.id = json.id
        json.saefi.rid = rid
        json.saefi.type = REPORT_TYPE_AEFI_INV
        dispatch(saveUploaded(json.saefi))
        dispatch(removeCompleted(json.saefi))
      } else {
        console.log(JSON.stringify(json))
        return
      }
      if(updateProgress) {
        dispatch(updateUploadStatus())
      } else {
        dispatch(setNotification({ message : messages.datauploaded, level: "info", id: new Date().getTime() }))
      }

    }).catch((error) => {
      if(updateProgress) {
        dispatch(updateUploadStatus())
      } else {
        dispatch(setNotification({ message : messages.erroruploading, level: "info", id: new Date().getTime() }))
      }
      dispatch(saveError(error))
    })
  }
}

export const resetUploadStatus = (uploaded) => (
  { type : RESET_UPLOAD_STATUS, uploaded }
)

export const updateUploadStatus = () => (
  { type : UPDATE_UPLOAD_STATUS }
)

export const uploadCompletedReports = (completed) => {
  return dispatch => {
    dispatch(resetUploadStatus(completed.length))
    completed.forEach((data) => {
      dispatch(uploadData(data, getURL(data), true))
    })
  }
}

export const setNotification = (notification) => (
  { type : SET_NOTIFICATION, notification }
)
