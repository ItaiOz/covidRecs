import { useCallback, useState } from "react";
import React from "react";
import classes from "./TasksBar.module.css";
import { CSVLink } from "react-csv";

const TasksBar = (props) => {
  const [searchTerm, setSearchTerm] = useState();
  const [error, setError] = useState("");

  const newBut = (
    <button
      onClick={(e) => {
        console.log("clicked");
      }}
    >
      Click me
    </button>
  );

  const filterSearch = (e) => {
    e.preventDefault();
    if (searchTerm.length < 3) {
      setError("Search term is less than 3 characters");
      return;
    }
    setError("");

    let filteredNames = props.customers.filter((val) =>
      val.firstName
        .toLowerCase()
        .concat(
          val.firstName.toLowerCase(),
          " ",
          val.lastName.toLowerCase(),
          " ",
          val.address.toLowerCase(),
          " ",
          val.city.toLowerCase(),
          " ",
          val.zipCode.toLowerCase(),
          " ",
          val.landLine.toLowerCase(),
          " ",
          val.cellPhone.toLowerCase(),
          " ",
          val.prevDiseases.toLowerCase()
        )
        .includes(searchTerm.toLowerCase())
    );
    props.onChangedSearch(filteredNames);
  };
  const onChange = useCallback((e) => setSearchTerm(e.target.value), []);

  return (
    <React.Fragment>
      <div className={classes.form_container}>
        <form className={classes.searchForm}>
          <input
            className={classes.searchInput}
            onChange={onChange}
            placeholder="Search..."
          ></input>
          <button
            type="submit"
            className={classes.summaryButton}
            onClick={filterSearch}
          >
            Go
          </button>
          <CSVLink
            data={props.customers}
            className={classes.exportButton}
            filename="CS_assignment_data"
          >
            Export
          </CSVLink>
        </form>
        <p>{error}</p>
      </div>
    </React.Fragment>
  );
};

export default TasksBar;
