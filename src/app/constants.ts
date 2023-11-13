export const BASE_URL = 'http://localhost:8080'; // local
// export const BASE_URL = 'https://bai-backenngd-service-stage.whiteriver-6da5cceb.eastus.azurecontainerapps.io'; // stage
// export const BASE_URL = 'https://bai-backend-service.whiteriver-6da5cceb.eastus.azurecontainerapps.io'; // prod
export const CLIENT_LOCATION_URL = 'https://geolocation-db.com/json/';
export const MEMBER_ENDPOINT='api/member'
export const UPD_PASS_ENDPOINT=MEMBER_ENDPOINT+'/updatePassword'
export const MEMBER_REGISTRATION_ENDPOINT='api/auth/register'
export const TEMP_PASS_ENDPOINT='api/auth/tempPassword'
export const MEMBER_LOGIN_ENDPOINT='api/auth/login'
export const MEMBER_LOGOUT_ENDPOINT='api/auth/logout'
export const BACKEND_SYS_ERROR = 'If the issue persists, please contact support@baiweb.com'
export const STATE_LIST: string[] = [
    'IN',
    'OH',
    'KY'
  ]
