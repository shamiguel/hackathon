export const BASE_URL = process.env['NODE_ENV'] === "production" ? "/api/auth" : "http:localhost:8080/api/auth;"

export const USER_SIGN_IN_URL = BASE_URL + '/signin';
export const PROJECT_URL = BASE_URL + '/projects'