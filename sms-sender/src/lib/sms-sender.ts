import axios from 'axios';
import { NetsapiensApiManager } from '@challenge-ns-sms-demo/common-models';

export class SmsSender {

  constructor(private nsApiManager: NetsapiensApiManager) {

  }

  async sendSms(message: string, to: string): Promise<string> {

    try {
      // Get the access token
      const accessToken = await this.nsApiManager.getAccessToken();
      const fromNum = this.nsApiManager.getSmsDid();

      // Required Session ID.  This can be used on the backend to track conversations
      const sessionId = Math.random().toString(36).substring(7);

      // Optional Upload DID
      const uploadId = Math.random().toString(36).substring(7);
      const user = accessToken.user;

      // Define the parameters for the API request
      const params = new URLSearchParams({
        object: 'message',
        action: 'create',
        domain: this.nsApiManager.getDomain(),
        user: user,
        type: 'sms',
        session_id: sessionId,
        from_num: fromNum,
        destination: to,
        message: message
      });

      // Construct the URL for the API request
      const url = `${this.nsApiManager.getBaseUrl()}/ns-api?${params.toString()}`;

      // Define the request options
      const request = {
        method: 'post',
        url: url,
        headers: {
          'Authorization': `Bearer ${accessToken.access_token}`,
          'Accept': 'application/json'
        }
      };

      // Send the API request using axios
      await axios(request);
    } catch (e) {
      console.error(e);
      return "bar";
    }
  }



}