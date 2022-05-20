export type PageType = {
  description: string;
  organization: string;
  region: string;
  ip: string;
  score: number;
  fraud_score?: number;
  id? :string;
}

export type CurrentIpType = {
  ip: string;
}

export type UserRegisterType = {
  firsName: string;
  lastName: string;
  email: string;
  password: string;
  passwordRepeat: string;
}

export type AuthJwtType = {
  accesToken: string;
  expiresIn: string;
}

export type StatusRequestType = {
  code: -1|-2|1;
  message: string;
  data: any;
}

export type PaginationRequestType = {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  result: PageType[]
}