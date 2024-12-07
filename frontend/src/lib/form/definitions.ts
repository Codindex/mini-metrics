export type SignupInput = {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

export type SigninInput = {
  email: string;
  password: string;
}

export type ErrorMessage = {
  message: string;
  status: number;
}
