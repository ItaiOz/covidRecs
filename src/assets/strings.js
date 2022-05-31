export const columnTitleName = "Name";
export const columnTitleDOB = "Date Of Birth";
export const columnTitleAddress = "Address";
export const columnTitleLandLine = "Land Line";
export const columnTitleCellPhone = "Mobile";
export const columnTitleInfected = "Infected";
export const columnTitleprevDiseases = "Previous Diseases";

export const tableValueFormated = (str1, str2) => `${str1} ${str2}`;

export const tableAddressFormated = (address) => {
  const reducedValues = address.filter((element) => {
    return element !== "";
  });
  if (reducedValues.length === 0) return "";
  else if (reducedValues.length === 1) return reducedValues[0];
  else if (reducedValues.length === 2)
    return `${reducedValues[0]}, ${reducedValues[1]}`;
  else return `${reducedValues[0]}, ${reducedValues[1]}, ${reducedValues[2]}`;
};
