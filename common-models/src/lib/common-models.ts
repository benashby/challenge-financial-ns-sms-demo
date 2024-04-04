export interface NetsapiensApiConfigPayload {
  nsApiBaseUrl: string;
  nsApiUsername: string;
  nsApiPassword: string;
  nsApiClientId: string;
  nsApiClientSecret: string;
  nsApiDomain: string;
  nsApiSmsDid: string;
}

export interface NetsapiensTokenResponse {
  username: string,
  user: string,
  access_token: string,
  expires_in: number,
  refresh_token: string
  client_id: string
}