# ChallengeNsSmsDemo

This is a demo prepared by Ben Ashby with Xima Software for Challenge Financial. The purpose of this demo is to demonstrate how to send and receive SMS messages with Netsapiens.

## Key Components

### SmsSender

Located in `sms-sender/src/lib/sms-sender.ts`, this class is responsible for sending SMS messages. It uses the Netsapiens API to send messages. The `sendSms` method is the main function that sends the SMS.

### SmsListener

Located in `sms-listener/src/lib/sms-listener.model.ts`, this interface defines the structure of the incoming SMS body. It is used to parse the incoming SMS messages.

### Basic Send Receive Test

The file `src/basic-send-receive.spec.ts` contains a test that demonstrates the basic functionality of sending and receiving an SMS message. It sets up an `SmsListener` and an `SmsSender`, sends a message, and then asserts that the message was received.

## Running the Demo

To see the demo in action, run the test in `src/basic-send-receive.spec.ts`. This will send an SMS message and then listen for the incoming message.

## Further Reading

For more information on how to use this demo, refer to the individual files mentioned above. Each contains comments explaining the code in more detail.