import { serializeError } from "serialize-error";
import { GCPLogger } from "npm-gcp-logging";
import { GCPAccessToken } from "npm-gcp-token";

export default {
  async queue(batch, env) {
    self.location = new URL("https://www.google.com");
    let messages = JSON.stringify(batch.messages);
    var logging_token = await new GCPAccessToken(
      env.GCP_LOGGING_CREDENTIALS
    ).getAccessToken("https://www.googleapis.com/auth/logging.write");
    const responseError = serializeError(e);
    await GCPLogger.logEntry(
      env.GCP_LOGGING_PROJECT_ID,
      logging_token.access_token,
      env.LOG_NAME,
      [
        {
          severity: "INFO",
          // textPayload: message,
          jsonPayload: {
            messages: messages,
          },
        },
      ]
    );
  },
};
