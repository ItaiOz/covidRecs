import React, { useEffect, useState } from "react";
import CustomersList from "../components/CustomersList";
import TasksBar from "../components/TasksBar";
import { getObject } from "../assets/Utils";

const Summary = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://127.0.0.1:8000/records")
      .then((response) => {
        if (!response.ok) throw response;

        return response.json();
      })
      .then((data) => {
        let loadedCustomers = [];
        let newCustomer;
        for (const customer in data) {
          newCustomer = getObject(data[customer]);
          loadedCustomers.push(newCustomer);
        }
        setCustomers(loadedCustomers);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        console.log(err);
        throw new Error(err);
      });
  }, []);

  let content = <p>Found no data</p>;

  if (customers.length > 0) content = <CustomersList customers={customers} />;

  if (isLoading) content = <p>Loading...</p>;
  if (isError) content = <p>Error on loading data</p>;

  return (
    <React.Fragment>
      <h1>Covid records data list</h1>
      <main>
        <TasksBar
          customers={customers}
          onChangedSearch={(filteredRecords) => setCustomers(filteredRecords)}
        />
        <section>{content}</section>
      </main>
    </React.Fragment>
  );
};
export default Summary;
