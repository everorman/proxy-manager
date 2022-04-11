export type PageType = {
  description: string;
  organization: string;
  region: string;
  ip: string;
  score: number;
  fraud_score?: number;
}

export type CurrentIpType = {
  ip: string;
}

export type UserType = {
  firsName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}