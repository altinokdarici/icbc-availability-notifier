import { AzureFunction, Context } from "@azure/functions";

import {
  sendWhatsappMessage,
  getFirstAvailableAppointmentDate,
} from "./services";
import { toShortDateString } from "./utils";

const searchConfig = {
  location: 93, // Richmond
  examType: "6-R-1", // Class 6, Road Test
  examDate: "2022-03-12",
  ignoreReserveTime: false,
  daysOfWeek: "[0,1,2,3,4,5,6]",
  partsOfDay: "[0,1]",
};

const timerTrigger: AzureFunction = async function (
  context: Context,
  functionTimer: any
): Promise<void> {
  var timeStamp = new Date().toISOString();

  if (functionTimer.isPastDue) {
    context.log("Timer function is running late!");
  }
  context.log("Timer trigger function ran!", timeStamp);

  const storedAppointmentDateString: string | undefined =
    context.bindings.storedAppointmentDateInput;

  const lastStoredDate = storedAppointmentDateString
    ? new Date(storedAppointmentDateString)
    : undefined;

  context.log("Last Stored Date", lastStoredDate);

  const newDate = new Date("2022-06-06"); // await getFirstAvailableAppointmentDate(searchConfig);
  context.log("ICBC First Available Date", newDate);

  if (!lastStoredDate || newDate < lastStoredDate) {
    context.log("Better date found", newDate);

    context.log("Updating the stored value with", newDate);
    context.bindings.storedAppointmentDateOutput = toShortDateString(newDate);

    context.log("Sending Whatsapp message");
    const messageResult = await sendWhatsappMessage(toShortDateString(newDate));
    context.log("Whatsapp message has been sent", messageResult);
  }

  context.log("Exiting");

  context.done();
};

export default timerTrigger;
