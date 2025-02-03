export const validationUsername = (value: string) => {
  return value.trim().length >= 3;
};

export const validationPassword = (value: string) => {
  return value.trim().length > 0;
};
