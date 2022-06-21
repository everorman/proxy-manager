export enum ProxyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type ProxyType = {
  id?: number;
  host: string,
  description: string,
  status: ProxyStatus,
  hostUser: string,
  hostPassword: string,
  created_at?: Date,
}

export type SearchUserType = {
  'id': number;
  'firstName': string;
  'lastName': string;	
  'email': string;
}

