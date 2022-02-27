export const getEnvironmentVariable = (name: string) => {
    const value = process.env[name];
    if (!value) {
      throw new Error(`${name} environment variable is not set.`);
    }
  
    return value;
  };