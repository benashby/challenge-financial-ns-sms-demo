import { smsSender } from './sms-sender';

describe('smsSender', () => {
  it('should work', () => {
    expect(smsSender()).toEqual('sms-sender');
  });
});
