export interface IncomingSmsBody {
  id: string;
  timestamp: string;
  type: string;
  domain: string;
  direction: string;
  rx_hostname: string;
  from_num: string;
  from_uid: string;
  from_attendee_id: null;
  from_ua: string;
  dialed: string;
  text: string;
  term_uid: string;
  term_num: string;
  carrier: string;
  status: string;
  session_id: string;
  instance_id: null;
  media_type: string;
  media_size: number;
  participants: null;
  deleted_timestamp: string;
  session_name: string;
  second_old: number;
  ses_user: string;
  ses_domain: string;
}