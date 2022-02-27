import Twilio from "twilio";
import { getEnvironmentVariable } from "../utils";

const getConfig = () => {
  const twilioSettings = JSON.parse(getEnvironmentVariable("Twilio"));

  return {
    accountSid: twilioSettings.accountSid,
    token: twilioSettings.token,
    to: twilioSettings.to,
    from: twilioSettings.from,
  };
};

export const sendWhatsappMessage = async (body: string) => {
  const { accountSid, token, from, to } = getConfig();

  const client = new Twilio.Twilio(accountSid, token);

  const message = await client.messages.create({
    from: `whatsapp:${from}`,
    to: `whatsapp:${to}`,
    body,
  });

  return message;
};
