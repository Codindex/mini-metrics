export type SignupInput = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type LoginInput = {
  email: string;
  password: string;
}

export type ErrorMessage = {
  message: string;
  status: number;
}
