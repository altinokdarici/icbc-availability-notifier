import fetch from "node-fetch";

import { SearchConfig } from "./SearchConfig";
import { DriverInfo } from "./getDriverInfo";

const appointmentsEndpoint =
  "https://onlinebusiness.icbc.com/deas-api/v1/web/getAvailableAppointments";

export const getAvailableAppointments = async (
  token: string,
  driverInfo: DriverInfo,
  searchConfig: SearchConfig
) => {
  const response = await fetch(appointmentsEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      aPosID: searchConfig.location,
      examType: searchConfig.examType,
      examDate: searchConfig.examDate,
      ignoreReserveTime: searchConfig.ignoreReserveTime,
      prfDaysOfWeek: searchConfig.daysOfWeek,
      prfPartsOfDay: searchConfig.partsOfDay,
      lastName: driverInfo.lastName,
      licenseNumber: driverInfo.licenseNumber,
    }),
  });

  if (response.status !== 200) {
    throw new Error("getAvailableAppointments failed.");
  }

  return response.json() as Promise<[{ appointmentDt: { date: string } }]>;
};
