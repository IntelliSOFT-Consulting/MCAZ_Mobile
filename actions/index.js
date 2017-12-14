import { SAVE_DRAFT_REPORT, REMOVE_DRAFT_REPORT, SAVE_COMPLETED_REPORT, REMOVE_COMPLETED_REPORT, VIEW_REPORT,
 SAVE_UPLOADED_REPORT, REMOVE_UPLOADED_REPORT, SET_REPORT_FILTER, CHANGE_CONNECTION_STATUS, SAVE_ERROR, SAVE_FETCHED_REPORTS,
 RESET_UPLOAD_STATUS, UPDATE_UPLOAD_STATUS, SET_NOTIFICATION, LOGGED_IN, LOGOUT }  from './actionTypes'

import { MAIN_URL, LOGIN_URL, SIGNUP_URL, REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from '../utils/Constants'
import { getRequestPayload, getURL } from '../utils/utils'
import messages from '../utils/messages.json'

import { ADR_URL, SAE_URL, AEFI_URL, SAEFI_URL } from '../utils/Constants'

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

export const saveFetchedReports = (data) => (
  { type : SAVE_FETCHED_REPORTS, data }
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

export const uploadData = (data, url, token, updateProgress) => {
  return dispatch => {
    dispatch(saveCompleted(data))
    dispatch(removeDraft(data))
    const rid = data.rid
    const type = data.type
    return fetch(url, {
      method : "POST",
      headers: {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(getRequestPayload(data))
    }).then(response => response.json()).then((json) => {
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

export const loggedIn = (token) => (
  { type : LOGGED_IN, token }
)

export const logout = (token) => (
  { type : LOGOUT }
)

export const login = (data) => {
  return dispatch => {
    return fetch(LOGIN_URL, {
      method : "POST",
      headers: { "Accept" : "application/json", 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => response.json()).then((json) => {
      if(json.success) {
        dispatch(loggedIn(json.data.token))
        dispatch(fetchAllReports(ADR_URL, json.data.token))
        dispatch(fetchAllReports(SAE_URL, json.data.token))
        dispatch(fetchAllReports(AEFI_URL, json.data.token))
        dispatch(fetchAllReports(SAEFI_URL, json.data.token))
      } else {
        dispatch(setNotification({ message : messages.login_error, level: "error", id: new Date().getTime() }))
      }

    }).catch((error) => {
      dispatch(setNotification({ message : messages.login_error, level: "error", id: new Date().getTime() }))
    })
  }
}

export const signUp = (data) => {
  return dispatch => {
    return fetch(SIGNUP_URL, {
      method : "POST",
      headers: { "Accept" : "application/json", 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(response => response.json()).then((json) => {
      console.log(json)
      dispatch(loggedIn(json.token))
    }).catch((error) => {
      dispatch(setNotification({ message : messages.login_error, level: "error", id: new Date().getTime() }))
    })
  }
}

export const resetUploadStatus = (uploaded) => (
  { type : RESET_UPLOAD_STATUS, uploaded }
)

export const updateUploadStatus = () => (
  { type : UPDATE_UPLOAD_STATUS }
)

export const uploadCompletedReports = (completed, token) => {
  return dispatch => {
    dispatch(resetUploadStatus(completed.length))
    completed.forEach((data) => {
      dispatch(uploadData(data, getURL(data), token, true))
    })
  }
}

export const setNotification = (notification) => (
  { type : SET_NOTIFICATION, notification }
)

export const setReport = (report) => (
  { type : VIEW_REPORT, report }
)

export const fetchReport = (id, url, token) => {
  return dispatch => {
    return fetch(url + "/" + id, {
      method : "GET",
      headers: {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    }).then(response => response.json()).then((json) => {
      console.log(json)
      if(json.sadr) {
        json.sadr.type = REPORT_TYPE_ADR
        dispatch(setReport(json.sadr))
      } else if(json.adr) {
        json.adr.type = REPORT_TYPE_SAE
        dispatch(setReport(json.adr))
      } else if(json.aefi) {
        json.aefi.type = REPORT_TYPE_AEFI
        dispatch(setReport(json.aefi))
      } else if(json.saefi) {
        json.saefi.type = REPORT_TYPE_AEFI_INV
        dispatch(setReport(json.saefi))
      } else {
        dispatch(setNotification({ message : messages.report_not_found, level: "warn", id: new Date().getTime() }))
        return
      }
    }).catch((error) => {
      dispatch(setNotification({ message : messages.request_error, level: "error", id: new Date().getTime() }))
    })
  }
}

export const fetchAllReports = (url, token) => {
  return dispatch => {
    return fetch(url, {
      method : "GET",
      headers: {
        "Accept" : "application/json",
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    }).then(response => response.json()).then((json) => {
      console.log(json)

      const getReports = (reports, type) => {
        return reports.map((r) => {
          r.type = type
          return r
        })
      }
      if(json.sadrs) {
        dispatch(saveFetchedReports(getReports(json.sadrs, REPORT_TYPE_ADR)))
      } else if(json.adrs) {
        dispatch(saveFetchedReports(getReports(json.adrs, REPORT_TYPE_SAE)))
      } else if(json.aefis) {
        dispatch(saveFetchedReports(getReports(json.aefis, REPORT_TYPE_AEFI)))
      } else if(json.saefis) {
        dispatch(saveFetchedReports(getReports(json.saefis, REPORT_TYPE_AEFI_INV)))
      } else {
        console.log(JSON.stringify(json))
        return
      }
    }).catch((error) => {
      dispatch(setNotification({ message : messages.request_error, level: "error", id: new Date().getTime() }))
    })
  }
}
