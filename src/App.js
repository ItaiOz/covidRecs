import "./App.css";
import Header from "./components/Header";
import Form from "./pages/Form";
import Summary from "./pages/Summary";
import { Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header></Header>
      {/* <main> */}
      <Route path="/" exact>
        <Redirect to="/form" />
      </Route>
      <Route path="/form">
        <Form />
      </Route>
      <Route path="/summary">
        <Summary />
      </Route>
      {/* </main> */}
    </div>
  );
}

export default App;
