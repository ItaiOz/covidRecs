import moment from "moment";

export const sum = () => {
  console.log("im in export file");
  return 14;
};

export const validate = (values) => {
  const errors = {};
  let phoneRegex = /^\d+$/;

  if (!values.FirstName) errors.FirstName = "First name is required!";
  if (!values.LastName) errors.LastName = "Last name is required!";

  if (!values.DateOfBirth) errors.DateOfBirth = "Date is required!";
  else if (!moment(values.DateOfBirth, "YYYY-MM-DD").isValid())
    errors.DateOfBirth = "Date is not valid!";

  if (!values.CellPhone) errors.CellPhone = "Phone number is required!";
  else if (!phoneRegex.test(values.CellPhone))
    errors.CellPhone = "Phone number must include numbers only!";

  return errors;
};
