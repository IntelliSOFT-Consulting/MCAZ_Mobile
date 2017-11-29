import { REPORT_TYPE_ADR, REPORT_TYPE_SAE, REPORT_TYPE_AEFI, REPORT_TYPE_AEFI_INV } from './Constants'

export const getRequestPayload  = (data) => {
  if(data.type == REPORT_TYPE_ADR) {
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
  }
}
