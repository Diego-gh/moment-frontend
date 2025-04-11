export interface LoginFormType {
  email: string;
  password: string;
}

export interface RegisterFormType extends LoginFormType {
  username: string;
  displayName: string;
  termsOfServiceAgreed: boolean;
}
