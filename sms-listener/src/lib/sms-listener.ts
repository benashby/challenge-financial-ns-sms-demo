import ngrok from '@ngrok/ngrok';
import { Subject } from 'rxjs';
import { IncomingSmsBody } from './sms-listener.model';
import * as express from 'express';
import axios from 'axios';
import { NetsapiensApiManager } from '@challenge-ns-sms-demo/common-models';

export class SmsListener {

  messages: Subject<IncomingSmsBody> = new Subject();

  private ngrokTunnel: ngrok.Listener;

  constructor(private ngrokAuthToken: string,
              private nsApiManager: NetsapiensApiManager) {
    console.log('Constructing SmsListener');
  }

  async start(): Promise<void> {
    await this.bootstrapNgrokTunnel();
    await this.bootstrapExpressServer();
    await this.subscribeToNetsapiensSms();
  }

  async stop() {
    console.log('Closing ngrok tunnel');
    await this.ngrokTunnel.close();
  }

  private async bootstrapNgrokTunnel() {
    console.log('Opening ngrok tunnel');
    this.ngrokTunnel = await ngrok.forward(
      {
        addr: 8080,
        authtoken: this.ngrokAuthToken
      }
    );
    console.log(`Listening for incoming SMS on ${this.ngrokTunnel.url()}`);
  }

  private async bootstrapExpressServer() {
    console.log('Starting express server');
    const app = express.default();
    app.use(express.json())
    app.post('/', (req, res) => {
      console.log(`Received message: ${JSON.stringify(req.body)}`);
      req.body.forEach((message: any) => {
        this.messages.next(message);
      })
    });
    app.listen(8080, () => {
      console.log('Express server started');
    });
  }

  private async subscribeToNetsapiensSms() {
    console.log('Subscribing to Netsapiens SMS');
    const accessToken = await this.nsApiManager.getAccessToken();
    this.nsApiManager.getBaseUrl();
    const postUrl = this.ngrokTunnel.url();
    const domain = this.nsApiManager.getDomain();

    const params = new URLSearchParams({
      object: 'event',
      action: 'create',
      model: 'message',
      post_url: postUrl,
      domain: domain,
      user: accessToken.user
    });

    const url = `${this.nsApiManager.getBaseUrl()}/ns-api?${params.toString()}`;

    const request = {
      method: 'post',
      url: url,
      headers: {
        'Authorization': `Bearer ${accessToken.access_token}`,
        'Accept': 'application/json'
      }
    };

    await axios(request);

  }

}