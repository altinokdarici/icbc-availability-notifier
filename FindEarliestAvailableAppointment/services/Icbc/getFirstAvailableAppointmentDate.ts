import { SearchConfig } from "./SearchConfig";
import { getAuthorizationToken } from "./getAuthorizationToken";
import { getAvailableAppointments } from "./getAvailableAppointments";
import { getDriverInfo } from "./getDriverInfo";

export const getFirstAvailableAppointmentDate = async (
  searchConfig: SearchConfig
): Promise<Date> => {
  const driverInfo = getDriverInfo();

  const token = await getAuthorizationToken(driverInfo);
  if (!token) {
    throw new Error("Authorization token is not available");
  }
  console.log("ICBC Token", token);

  const appointments = await getAvailableAppointments(
    token,
    driverInfo,
    searchConfig
  );

  console.log("ICBC First Appointment", appointments[0]);
  const earliestDate = new Date(appointments[0].appointmentDt.date);

  return earliestDate;
};
