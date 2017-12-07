import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from './Constants'
import { ADR_URL, SAE_URL, AEFI_URL, SAEFI_URL } from './Constants'

export const getRequestPayload  = (data) => {
  /*if(data.type == REPORT_TYPE_ADR) {
    var payload = {}
    payload.sadr = data
    return payload
  } else if(data.type == REPORT_TYPE_SAE) {
    var payload = {}
    payload.adr = data
    return payload
  } else if(data.type == REPORT_TYPE_AEFI) {
    var payload = {}
    payload.aefi = data
    return payload
  } else if(data.type == REPORT_TYPE_AEFI_INV) {
    var payload = {}
    payload.saefi = data
    return payload
  }*/
  return data
}

export const getURL = (data) => {
  if(data.type == REPORT_TYPE_ADR) {
    return ADR_URL
  } else if(data.type == REPORT_TYPE_SAE) {
    return SAE_URL
  } else if(data.type == REPORT_TYPE_AEFI) {
    return AEFI_URL
  } else if(data.type == REPORT_TYPE_AEFI_INV) {
    return SAEFI_URL
  }
}


export const pad = (value) => {
  if(isNaN(value) || value === '') {
    return value
  }
  if(value && value < 10) {
    return '0' + value
  }
  return value
}
