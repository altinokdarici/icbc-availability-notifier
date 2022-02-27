import fetch from "node-fetch";
import { DriverInfo } from "./getDriverInfo";

const authorizationEndpoint =
  "https://onlinebusiness.icbc.com/deas-api/v1/webLogin/webLogin";

export const getAuthorizationToken = async (driverInfo: DriverInfo) => {
  const response = await fetch(authorizationEndpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      drvrLastName: driverInfo.lastName,
      licenceNumber: driverInfo.licenseNumber,
      keyword: driverInfo.keyword,
    }),
  });

  if (response.status !== 200) {
    throw new Error("getAuthorizationToken failed.");
  }

  return response.headers.get("Authorization");
};
