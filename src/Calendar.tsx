import React, { useState, useEffect } from "react";
import Month from "./Month";
import svLocale from "date-fns/locale/sv";
import { eachMonthOfInterval, format, getYear, getMonth, toDate,addMonths, subMonths } from "date-fns";
import DayDetails from './DayDetails';
import { Context, DayEvent } from './Context';
import AddEventForm from './AddEventForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Button } from "react-bootstrap";
import InlineBookingForm from "./InlineBookingForm";

const Calendar: React.FC = () => {
  //states in context
  const [activeMonth, setActiveMonth] = useState<Date | undefined>(toDate(Date.now()));
  const [activeDay, setActiveDay] = useState<Date | undefined>(toDate(Date.now()));
  const [activeStartDay, setActiveStartDay] = useState<Date | undefined>(null);
  const [activeEndDay, setActiveEndDay] = useState<Date | undefined>(null);

  const [showAddDayEvent, setShowAddDayEvent] = useState(false);

        
  const [events, setEvents] = useState([]);

  const getAllEvents = async()=> {
    const result = await fetch("http://localhost:3001/events");
    const data = await result.json();
    console.log("All events ",data);
    setEvents(data);
  }
  
  const deleteEvent = async (id: string) => {
    console.log("ta å deleta ", id);
    const result = await fetch("http://localhost:3001/events/"+id,
    {method:"DELETE"});
    const data = await result.json();
  
    getAllEvents();
  }
  const addEventToDb = async (d: FormData) => {
    console.log("vad är d?? ", d);
    const result = await fetch("http://localhost:3001/events/",
    {
      method:"POST",
      body:JSON.stringify(d),
      headers:{"Content-Type": "application/json"}
    });
    const data = await result.json();
    getAllEvents();
  }


// useEffect ser till att vi bara kör getAllEvents såfort nån dependencys har uppdaterats
//useEffect(func, dependencyarray)
  useEffect(()=>{
      getAllEvents()
      }, []);
const handleNextMonthClick =(event:React.MouseEvent<HTMLElement>)=> {
    setActiveMonth(addMonths(activeMonth,1));
  }
  const handlePrevMonthClick =(event:React.MouseEvent<HTMLElement>)=> {
    setActiveMonth(subMonths(activeMonth, 1));
  }
    const nameOfMonth = format(activeMonth, "MMMM", { locale: svLocale });

return (
  
<Context.Provider value={{ activeStartDay, setActiveStartDay, activeEndDay, setActiveEndDay, deleteEvent, activeDay, setActiveDay, activeMonth, setActiveMonth, events, setEvents, setShowAddDayEvent, showAddDayEvent, addEventToDb}}>

    <Container className="ronnskar-page-container">
      <Row>
          <div className="change-month col">
          <button onClick={handlePrevMonthClick}> &#60;</button>
          <h1 className={"h4"}>{nameOfMonth}</h1>
          <button onClick={handleNextMonthClick}>&#62;</button>
        </div>
      </Row>
    <Row>
        {activeMonth && <Month />}
        <Col className="day-details col-md-6" >
          {activeDay && <InlineBookingForm day={activeDay} />} 
          
          {activeDay && <DayDetails day={activeDay} />}       
        </Col>
        
      {activeDay && showAddDayEvent && <AddEventForm day={activeDay}/>} 
    </Row>
 
  </Container>
</Context.Provider>
  );
};

export default Calendar;
