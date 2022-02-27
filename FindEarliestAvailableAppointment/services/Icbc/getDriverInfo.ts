import { getEnvironmentVariable } from "../../utils";

export interface DriverInfo {
  lastName: string;
  licenseNumber: string;
  keyword: string;
}

export const getDriverInfo = (): DriverInfo => {
  const driver = JSON.parse(getEnvironmentVariable("Driver"));
  return {
    lastName: driver.lastName,
    licenseNumber: driver.licenseNumber,
    keyword: driver.keyword,
  };
};
