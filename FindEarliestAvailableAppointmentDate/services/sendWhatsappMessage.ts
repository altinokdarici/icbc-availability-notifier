import Twilio from "twilio";
import { getEnvironmentVariable } from "../utils";

const getConfig = () => {
  return {
    accountSid: getEnvironmentVariable("TwilioAccountSid"),
    token: getEnvironmentVariable("TwilioToken"),
    to: getEnvironmentVariable("TwilioToPhoneNumber"),
    from: getEnvironmentVariable("TwilioFromPhoneNumber"),
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
