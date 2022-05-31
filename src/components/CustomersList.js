import classes from "./CustomersList.module.css";
import { Strings } from "../assets";
import React from "react";

const TABLE_TITLES = [
  Strings.columnTitleName,
  Strings.columnTitleDOB,
  Strings.columnTitleAddress,
  Strings.columnTitleLandLine,
  Strings.columnTitleCellPhone,
  Strings.columnTitleInfected,
  Strings.columnTitleprevDiseases,
];

const renderTableTitles = (titlesArray) => {
  return (
    <thead>
      <tr>
        {titlesArray.map((title) => (
          <th key={Math.random()}>{title}</th>
        ))}
      </tr>
    </thead>
  );
};
const renderTableRecords = (record) => {
  return (
    <tr key={record.id}>
      <td>
        <strong>
          {Strings.tableValueFormated(record.firstName, record.lastName)}
        </strong>
      </td>
      <td>{record.DOB}</td>
      <td>
        {Strings.tableAddressFormated([
          record.address,
          record.city,
          record.zipCode,
        ])}
      </td>
      <td>{record.landLine}</td>
      <td>{record.cellPhone}</td>
      <td>{record.infected ? "Yes" : "No"}</td>
      <td>{record.prevDiseases ? record.prevDiseases : "None"}</td>
    </tr>
  );
};

const CustomersList = (props) => {
  return (
    <React.Fragment>
      <table className={classes["content-table"]}>
        {renderTableTitles(TABLE_TITLES)}
        <tbody>{props.customers.map(renderTableRecords)}</tbody>
      </table>
    </React.Fragment>
  );
};

export default CustomersList;
