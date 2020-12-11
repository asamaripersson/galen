import React, { useState, useEffect } from "react";
import Month from "./Month";
import svLocale from "date-fns/locale/sv";
import { eachMonthOfInterval, format, getYear, getMonth } from "date-fns";
import DayDetails from './DayDetails';
import { Context, DayEvent } from './Context';
import AddEventForm from './AddEventForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Button } from "react-bootstrap";

const Calendar: React.FC = () => {
  //states in context
  const [activeMonth, setActiveMonth] = useState(getMonth(Date.now()));
  const [activeDay, setActiveDay] = useState<Date | undefined>();
  const [showAddDayEvent, setShowAddDayEvent] = useState(false);

  const [events, setEvents] = useState([]);

  const getAllEvents = async()=> {
    const result = await fetch("http://localhost:3001/events");
    const data = await result.json();
    console.log("All events ",data);
    setEvents(data);
  }
  
  const deleteEvent = async(id:string)=>{
    const result = await fetch("http://localhost:3001/deleteEvent/"+id,
    {method:"DELETE"});
    const data = await result.json();
  
    getAllEvents();
  }
  const addEventToDb = async(d:FormData)=>{
    const result = await fetch("http://localhost:3001/events/",
    {
      method:"POST",
      body:JSON.stringify(d),
      headers:{"Content-Type": "application/json"}
    });
    const data = await result.json();
    getAllEvents();
  }

  const months = eachMonthOfInterval({
    start: new Date(getYear(Date.now()), 0, 1),
    end: new Date(getYear(Date.now()), 11, 30),
  });

  const monthArray = months.map((month) => ({
    title: format(month, "MMM", { locale: svLocale }),
    value: 1 / 12,
    color: getMonth(month) == activeMonth ? "#06BA63" : "#078c4c",
  }));


// useEffect ser till att vi bara kör getAllEvents såfort nån dependencys har uppdaterats
//useEffect(func, dependencyarray)
  useEffect(()=>{
      getAllEvents()
      }, []);

return (
  
<Context.Provider value={{ deleteEvent, activeDay, setActiveDay, events, setEvents, setShowAddDayEvent, showAddDayEvent, addEventToDb}}>

  <Container>
    <Row>
      {activeMonth > -1 && <Month month={months[activeMonth]} />}
      {activeDay && <DayDetails day={activeDay}/>} 
      {activeDay && showAddDayEvent && <AddEventForm day={activeDay}/>} 
    </Row>
 
  </Container>
</Context.Provider>
  );
};

export default Calendar;
