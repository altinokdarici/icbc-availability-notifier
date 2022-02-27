import Twilio from "twilio";
import { getEnvironmentVariable } from "../utils";

const getConfig = (log: (...args: any[]) => void) => {
  const json = getEnvironmentVariable("Twilio");
  log(json);

  const twilioSettings = JSON.parse(json);

  return {
    accountSid: twilioSettings.accountSid,
    token: twilioSettings.token,
    to: twilioSettings.to,
    from: twilioSettings.from,
  };
};

export const sendWhatsappMessage = async (
  body: string,
  log: (...args: any[]) => void
) => {
  const { accountSid, token, from, to } = getConfig(log);

  const client = new Twilio.Twilio(accountSid, token);

  const message = await client.messages.create({
    from: `whatsapp:${from}`,
    to: `whatsapp:${to}`,
    body,
  });

  return message;
};
