export const BASE_URL = process.env['NODE_ENV'] === "production" ? "/" : "http://localhost:8080/";

export const USER_SIGN_IN_URL = BASE_URL + 'api/auth/signin';
export const PROJECT_URL = BASE_URL + 'api/auth/projects';