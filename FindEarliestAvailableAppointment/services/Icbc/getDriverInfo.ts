import { getEnvironmentVariable } from "../../utils";

export interface DriverInfo {
  lastName: string;
  licenseNumber: string;
  keyword: string;
}

export const getDriverInfo = (): DriverInfo => {
  return {
    lastName: getEnvironmentVariable("DriverLastName"),
    licenseNumber: getEnvironmentVariable("DriverLicenseNumber"),
    keyword: getEnvironmentVariable("DriverKeyword"),
  };
};
