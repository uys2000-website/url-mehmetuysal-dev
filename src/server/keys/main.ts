import { ServiceAccount } from "firebase-admin/app";
export default {
  type: "service_account",
  project_id: "mehmetuysal-dev",
  private_key_id: process.env.FB_MAIN_PRIVATE_KEY_ID,
  private_key: process.env.FB_MAIN_PRIVATE_KEY,
  client_email:
    "firebase-adminsdk-yvj56@mehmetuysal-dev.iam.gserviceaccount.com",
  client_id: "115879582157599704961",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yvj56%40mehmetuysal-dev.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
} as ServiceAccount;
