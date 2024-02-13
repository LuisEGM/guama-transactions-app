export const FORM_DEFAULT_VALUES = {
  name: "Name",
  amount: 0,
  status: "PENDING",
  date: "2024-01-01 00:00:00",
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
