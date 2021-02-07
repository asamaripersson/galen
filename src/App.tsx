import React from "react";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Calendar from "./Calendar";
import RonnskarPeople from "./RonnskarPeple";
import Home from "./Home";
import Protocol from "./Protocol";
function App() {
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

        <Route path="/protokoll">
          <Protocol />
        </Route>
        
        <Route path="/">
          <Home />
        </Route>
    </Switch>
     
    </>
  );
}

export default App;
