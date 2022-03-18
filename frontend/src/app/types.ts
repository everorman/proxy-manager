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