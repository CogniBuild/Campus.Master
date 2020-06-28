export interface User {
  email: string;
  password: string;
}

export interface RegisterUser {
  login: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface StateTransfer {
  message: string;
  payload: string;
}
