import { NetsapiensApiConfigPayload, NetsapiensTokenResponse } from './common-models';
import axios from 'axios';

export class NetsapiensApiManager {

  private accessToken: NetsapiensTokenResponse = null;

  constructor(private nsApiConfig: NetsapiensApiConfigPayload) {

  }

  public getBaseUrl(): string {
    return this.nsApiConfig.nsApiBaseUrl;
  }

  public getDomain(): string {
    return this.nsApiConfig.nsApiDomain;
  }

  public getSmsDid(): string {
    return this.nsApiConfig.nsApiSmsDid;
  }

  public async getAccessToken(): Promise<NetsapiensTokenResponse> {
    if (this.accessToken) {
      return this.accessToken
    }
    const response = await axios.post(`${this.nsApiConfig.nsApiBaseUrl}/ns-api/oauth2/token/`, {
      grant_type: 'password',
      username: this.nsApiConfig.nsApiUsername,
      password: this.nsApiConfig.nsApiPassword,
      client_id: this.nsApiConfig.nsApiClientId,
      client_secret: this.nsApiConfig.nsApiClientSecret
    });

    if (response.status === 200) {
      if (response.data) {
        this.accessToken = response.data;
        return this.accessToken;
      }
    } else {
      throw new Error(`NetsapiensApiLoginException: ${response.status}, ${response.headers['Warning']}`);
    }
  }

}