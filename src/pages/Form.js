import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import FormUtils from "../assets/FormUtils";
import moment from "moment";
import classes from "./Form.module.css";

const cities = [
  "Choose A City",
  "New York",
  "Los Angeles",
  "Sydney",
  "Melbourne",
  "Berlin",
  "London",
];

let prevDiseases = [
  { Disease: "Diabetes", status: false },
  { Disease: "Cardio-Vascular Problems", status: false },
  { Disease: "Allergies", status: false },
  { Disease: "Other", status: false },
];

const initialValues = {
  FirstName: "",
  LastName: "",
  DateOfBirth: "",
  Address: "",
  City: "",
  Zipcode: "",
  LandLine: "",
  CellPhone: "",
  Infected: false,
  previousDiseases: "",
};

const Form = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();

  new Array(prevDiseases.length).fill(false);

  const citiesList = cities.map((city) => (
    <option key={Math.random()}>{city}</option>
  ));

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (e.target.type !== "checkbox")
      setFormValues({ ...formValues, [name]: value });
    else setFormValues({ ...formValues, [name]: checked });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleDiseasesChange = (e) => {
    let index = prevDiseases.findIndex((el) => el.Disease === e.target.name);
    prevDiseases[index].status = !prevDiseases[index].status;

    let disStr = "";
    let filteredDiseases = prevDiseases.filter((el) => el.status === true);
    filteredDiseases.forEach((el) => {
      disStr += el.Disease + ", ";
    });
    if (disStr.length > 0) disStr = disStr.slice(0, -2);
    setFormValues({ ...formValues, previousDiseases: disStr });
  };

  const validate = (values) => {
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

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      };
      fetch("http://127.0.0.1:8000/records", requestOptions)
        .then((response) => {
          if (!response.ok) throw new Error("Error on data");
          // const data = response.json();
          console.log(response);
          history.push("/summary");
          // <Link to='/summary'></Link>
        })
        .catch((err) => {
          //show error on form (error modal???)
          console.log("its an error im telling yaaaa");
          console.log(err);
          throw new Error(err);
        });
    }
  }, [formErrors]);

  return (
    <main>
      <form onSubmit={submitHandler} className={classes.registrationForm}>
        <div className={classes.input__section}>
          <div>
            <input
              className={classes.registrationInput}
              name="FirstName"
              placeholder="First Name*"
              onChange={handleChange}
            ></input>
            <p>{formErrors.FirstName}</p>
          </div>
          <div>
            <input
              className={classes.registrationInput}
              name="LastName"
              placeholder="Last Name*"
              onChange={handleChange}
            ></input>
            <p>{formErrors.LastName}</p>
          </div>
        </div>
        <div className={classes.input__section}>
          <div>
            <input
              className={classes.registrationInput}
              name="DateOfBirth"
              placeholder="Date Of Birth (YYYY-MM-DD)*"
              onChange={handleChange}
            ></input>
            <p>{formErrors.DateOfBirth}</p>
          </div>
          <div>
            <input
              className={classes.registrationInput}
              name="Address"
              placeholder="Address"
              onChange={handleChange}
            ></input>
            <p>{formErrors.Address}</p>
          </div>
        </div>
        <div className={classes.input__section}>
          <div>
            <select name="City" value={formValues.City} onChange={handleChange}>
              {citiesList}
            </select>
            <p></p>
          </div>
          <div>
            <input
              className={classes.registrationInput}
              name="Zipcode"
              placeholder="Zip Code"
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className={classes.input__section}>
          <div>
            <input
              className={classes.registrationInput}
              name="LandLine"
              placeholder="Land Line"
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <input
              className={classes.registrationInput}
              name="CellPhone"
              placeholder="Phone*"
              onChange={handleChange}
            ></input>
            <p>{formErrors.CellPhone}</p>
          </div>
        </div>
        <div className={classes.checkbox__section}>
          <label htmlFor="infected">Have you been infected by COVID-19?</label>
          <input
            className={classes.registrationInput}
            name="Infected"
            type="checkbox"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <div className={classes.checkbox__section}>
            <label>Do you suffer from one of the following diseases?</label>
          </div>
          <div>
            <div className={classes.checkbox_diseases__elems}>
              <input
                className={classes.registrationInput}
                name="Diabetes"
                type="checkbox"
                onChange={handleDiseasesChange}
              ></input>
              <label htmlFor="Diabetes">Diabetes</label>
            </div>
            <div className={classes.checkbox_diseases__elems}>
              <input
                className={classes.registrationInput}
                name="Cardio-Vascular Problems"
                type="checkbox"
                onChange={handleDiseasesChange}
              ></input>
              <label htmlFor="Cardio-Vascular-Problems">
                Cardio-Vascular Problems
              </label>
            </div>
            <div className={classes.checkbox_diseases__elems}>
              <input
                className={classes.registrationInput}
                name="Allergies"
                type="checkbox"
                onChange={handleDiseasesChange}
              ></input>
              <label htmlFor="Allergies">Allergies</label>
            </div>
            <div className={classes.checkbox_diseases__elems}>
              <input
                className={classes.registrationInput}
                name="Other"
                type="checkbox"
                onChange={handleDiseasesChange}
              ></input>
              <label htmlFor="Other">Other</label>
            </div>
          </div>
        </div>
        <button className={classes.formButton}>Submit</button>
      </form>
    </main>
  );
};

export default Form;
