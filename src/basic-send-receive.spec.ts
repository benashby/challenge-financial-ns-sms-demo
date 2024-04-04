import { SmsListener } from '@challenge-ns-sms-demo/sms-listener';
import { SmsSender } from '@challenge-ns-sms-demo/sms-sender';
import { NetsapiensApiConfigPayload, NetsapiensApiManager } from '@challenge-ns-sms-demo/common-models';
import { take } from 'rxjs';

describe('Basic Send Receive', () => {

  const ngrokAuthToken = "REDACTED";

  const nsApiUrl = 'REDACTED';
  const nsApiUsername = 'REDACTED';
  const nsApiClientId = "REDACTED";
  const nsApiClientSecret = "REDACTED";
  const nsApiPassword = 'REDACTED';
  const nsApiDomain = 'REDACTED';
  const nsApiSmsDid = 'REDACTED';

  const nsApiConfig: NetsapiensApiConfigPayload = {
    nsApiBaseUrl: nsApiUrl,
    nsApiUsername: nsApiUsername,
    nsApiPassword: nsApiPassword,
    nsApiClientId: nsApiClientId,
    nsApiClientSecret: nsApiClientSecret,
    nsApiDomain: nsApiDomain,
    nsApiSmsDid: nsApiSmsDid
  }

  const nsApiManager = new NetsapiensApiManager(nsApiConfig);


  it('should send and receive a message', async () => {

    // Arrange
    const smsListener = new SmsListener(ngrokAuthToken, nsApiManager);
    await smsListener.start();

    const smsSender = new SmsSender(nsApiManager);

    // Act
    const message = await smsSender.sendSms('Hello World', 'REDACTED');

    // Assert
    const nextMessage = await smsListener.messages.pipe(
      take(1)
    ).toPromise();

    expect(message).toEqual('Response Typed On Phone');

    // Cleanup
    await smsListener.stop();

  });

})