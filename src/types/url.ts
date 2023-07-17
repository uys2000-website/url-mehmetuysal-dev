export class Url {
  urlOrginal!: string;
  urlIndex!: number;

  urlUsage!: number;
  urlUsageLimit!: number;

  urlContent!: string;
  urlBackground!: String;
  urlRedirectionTimer!: number;

  urlLockOwner?: string;
  urlOwner!: string;

  constructor(
    urlOrginal: string,
    urlIndex: number,

    urlUsageLimit?: number,
    urlContent?: string,
    urlBackground?: string,
    urlRedirectionTimer?: number,

    urlLockOwner?: string,
    urlOwner?: string
  ) {
    this.urlOrginal = urlOrginal;
    this.urlIndex = urlIndex;

    this.urlUsageLimit = urlUsageLimit ? urlUsageLimit : 0;
    this.urlUsage = 0;

    this.urlContent = urlContent ? urlContent : "";
    this.urlBackground = urlBackground ? urlBackground : "";
    this.urlRedirectionTimer = urlRedirectionTimer ? urlRedirectionTimer : 0;

    this.urlLockOwner = urlLockOwner ? urlLockOwner : "anonymous";
    this.urlOwner = urlOwner ? urlOwner : "anonymous";
  }
}
