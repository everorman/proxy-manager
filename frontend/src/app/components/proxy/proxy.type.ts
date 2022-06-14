enum ProxyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export type ProxyType = {
  id?: number;
  host: string,
  description: string,
  status: ProxyStatus,
  user: string,
  password: string,
}

