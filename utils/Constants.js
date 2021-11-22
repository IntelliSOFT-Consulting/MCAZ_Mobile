
/**
  Various constants
*/

// Report types
export const REPORT_TYPE_ADR = 'REPORT_TYPE_ADR'
export const REPORT_TYPE_SAE = 'REPORT_TYPE_SAE'
export const REPORT_TYPE_AEFI_INV = 'REPORT_TYPE_AEFI_INV'
export const REPORT_TYPE_AEFI = 'REPORT_TYPE_AEFI'

// Follow-ups
export const REPORT_TYPE_ADR_FOLLOW_UP = 'REPORT_TYPE_ADR_FOLLOW_UP' 
export const REPORT_TYPE_AEFI_FOLLOW_UP = 'REPORT_TYPE_AEFI_FOLLOW_UP'
export const REPORT_TYPE_SAE_FOLLOW_UP = 'REPORT_TYPE_SAE_FOLLOW_UP'
export const REPORT_TYPE_AEFI_INV_FOLLOW_UP = 'REPORT_TYPE_AEFI_INV_FOLLOW_UP'

// Report status
export const STATUS_DRAFT = 'STATUS_DRAFT'
export const STATUS_COMPLETED = 'STATUS_COMPLETED'
export const STATUS_UPLOADED = 'STATUS_UPLOADED'

export const MAIN_URL = 'http://104.237.146.235/api' // 'https://e-pv.mcaz.co.zw/api'

export const ADR_URL = MAIN_URL + '/sadrs' // Url for ADR
export const SAE_URL = MAIN_URL + '/adrs' // Url for SAE
export const AEFI_URL = MAIN_URL + '/aefis' // Url for AEFI
export const SAEFI_URL = MAIN_URL + '/saefis' // Url for SAEFI
export const LOGIN_URL = MAIN_URL + '/users/token' // Url for login
export const SIGNUP_URL = MAIN_URL + '/users/register' // Url for signup
export const CONTACT_US_URL = MAIN_URL + '/feedbacks' // Url for contact us
export const NEWS_URL = MAIN_URL + '/sites/news' // Url to fetch news
export const RESET_PASSWORD_URL = MAIN_URL + '/users/forgotPassword'

// Should be true for testing/non https
export const DISABLE_ALL_SECURITY = false;