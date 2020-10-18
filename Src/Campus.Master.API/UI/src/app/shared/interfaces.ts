export interface User {
  email: string;
  password: string;
}

export interface RegisterUser {
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: number;
}

export interface StateTransfer {
  message: string;
  payload: string;
}
