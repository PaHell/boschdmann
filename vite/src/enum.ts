export enum RequestMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export enum RequestModes {
    CORS = 'cors',
    NO_CORS = 'no-cors',
    SAME_ORIGIN = 'same-origin'
}

export enum RequestContentTypes {
    JSON = 'application/json',
    FORM = 'application/x-www-form-urlencoded'
}

export enum RequestCredentials {
    INCLUDE = 'include',
    SAME_ORIGIN = 'same-origin',
    OMIT = 'omit'
}