import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV, REPORT_TYPE_ADR_FOLLOW_UP, REPORT_TYPE_SAE_FOLLOW_UP,
  REPORT_TYPE_AEFI_FOLLOW_UP, REPORT_TYPE_AEFI_INV_FOLLOW_UP } from './Constants'
import { ADR_URL, SAE_URL, AEFI_URL, SAEFI_URL } from './Constants'
import moment from 'moment'
import Base64 from './Base64';

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
  } else if(data.type == REPORT_TYPE_SAE || data.type == REPORT_TYPE_SAE_FOLLOW_UP) {
    return SAE_URL
  } else if(data.type == REPORT_TYPE_AEFI || data.type === REPORT_TYPE_AEFI_FOLLOW_UP) {
    return AEFI_URL
  } else if(data.type == REPORT_TYPE_AEFI_INV || data.type == REPORT_TYPE_AEFI_INV_FOLLOW_UP) {
    return SAEFI_URL
  } else if(data.type == REPORT_TYPE_ADR_FOLLOW_UP) {
    return ADR_URL + "/followup/" + Base64.btoa(data.parent_reference)
  } /*else if(data.type == REPORT_TYPE_SAE_FOLLOW_UP) {
    return SAE_URL + "/followup/" + Base64.btoa(data.reference_number)
  } /*else if(data.type == REPORT_TYPE_AEFI_FOLLOW_UP) {
    return AEFI_URL + "/followup/" + Base64.btoa(data.parent_reference)
  }*/
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

export const getDateTimeFromString = (dateTime) => {
    const split = dateTime.split(" ")
    const v = split[0].split("-")

    var date = moment().year(v[2]).month(v[1]).date(v[0]) //new Date(model[name]['month'] + '/' + model[name]['day'] + '/' + model[name]['year'])

    if(split.length == 2) {
      const t = split[1].split(":")
      date.hour(t[0]).minute(v[1])
    }
    return date
  }

  export const validEmail = (email) => {
    const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  };
