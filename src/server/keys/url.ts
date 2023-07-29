import { ServiceAccount } from "firebase-admin/app";
export default {
  type: "service_account",
  project_id: "url-mehmetuysal-dev",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email:
    "firebase-adminsdk-b00up@url-mehmetuysal-dev.iam.gserviceaccount.com",
  client_id: "102203648803922196008",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b00up%40url-mehmetuysal-dev.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
} as ServiceAccount;
