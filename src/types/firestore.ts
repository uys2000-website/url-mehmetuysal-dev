export type Url = {
  targetUrl: string;
  numberUrl: number;
  currentUrl: string;

  isAnonimously: boolean;
  uID: string;

  count: number;
  hasCount: boolean;
  maxCount: number;

  useMailer: boolean;
  mail: string;

  showModal: boolean;
  modalID: string;

  hasBgUrl: boolean;
  bgUrl: string;

  hasPassword: boolean;
  isPublic: boolean;
  wait: number;
};

export type FireData = {
  record: any;
  timestamp: number;
  utimestamp: number;
};
