import React from "react";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Calendar from "./Calendar";
import RonnskarPeople from "./RonnskarPeple";

function App() {
  //En knapp som sätter calendarstate
  return (
    <>
     <Header />

    <Switch>
      <Route path="/ronnskar">
        <RonnskarPeople />
      </Route>

      <Route path="/boka">
        <Calendar />
      </Route>
    </Switch>
     
    </>
  );
}

export default App;
