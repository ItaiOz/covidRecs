import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validate } from "../assets/Utils";
import { prevDiseases, initialValues } from "../assets/FormAssets";
import ErrorModal from "../components/UI/ErrorModal";
import classes from "./Form.module.css";

const Form = () => {
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState();
  const history = useHistory();

  new Array(prevDiseases.length).fill(false);

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
          console.log(response);
          history.push("/summary");
        })
        .catch(() => {
          setError({
            title: "Error",
            message: "Error on submitting form, please try again later",
          });
          return;
        });
    }
  }, [formErrors]);

  const errorHandler = () => {
    setError(null);
  };

  return (
    <main>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
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
            <input
              className={classes.registrationInput}
              name="City"
              placeholder="City"
              onChange={handleChange}
            ></input>
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
