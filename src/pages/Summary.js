import React, { useEffect, useState } from "react";
import CustomersList from "../components/CustomersList";
import TasksBar from "../components/TasksBar";

const Summary = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://127.0.0.1:8000/records")
      .then((response) => {
        if (!response.ok) throw response;

        // console.log(response);
        return response.json();
      })
      .then((data) => {
        let loadedCustomers = [];
        for (const customer in data)
          loadedCustomers.push({
            id: data[customer].RecordId,
            firstName: data[customer].FirstName,
            lastName: data[customer].LastName,
            DOB: data[customer].DateOfBirth,
            address: data[customer].Address,
            city: data[customer].City,
            zipCode: data[customer].Zipcode,
            landLine: data[customer].LandLine,
            cellPhone: data[customer].CellPhone,
            infected: data[customer].Infected,
            prevDiseases: data[customer].previousDiseases,
          });
        setCustomers(loadedCustomers);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        //show error on form (error modal???)
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
