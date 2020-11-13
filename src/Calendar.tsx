import React, { useState, useEffect } from "react";
import Month from "./Month";
import { PieChart } from "react-minimal-pie-chart";
import svLocale from "date-fns/locale/sv";
import { eachMonthOfInterval, format } from "date-fns";
import DayDetails from './DayDetails';
import { Context, DayEvent } from './Context';
import AddEventForm from './AddEventForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Calendar: React.FC = () => {

  const [activeMonth, setActiveMonth] = useState(-1);
  const [activeDay, setActiveDay] = useState<Date | undefined>();
  const [showAddDayEvent, setShowAddDayEvent] = useState(false);

  const [events, setEvents] = useState([]);
  const getAllEvents = async()=>{
    const result = await fetch("http://localhost:3001/events");
    const data = await result.json();
    console.log("calendar - getall events", data);
    setEvents(data);
  }
  const deleteEvent = async(id:string)=>{
    const result = await fetch("http://localhost:3001/events/"+id,
    {method:"DELETE"});
    const data = await result.json();
    console.log("deleted? ", data);
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
    start: new Date(2020, 0, 1),//första januari detta år
    end: new Date(2020, 11, 30),//sista dec detta år
  });

  const monthArray = months.map((month) => ({
    title: format(month, "MMM", { locale: svLocale }),
    value: 1 / 12,
    color: "#06BA63",
  }));

  const onClick = (_: React.MouseEvent, index: number) => {
    setActiveMonth(index);
    setActiveDay(null);
  };

// useEffect ser till att vi bara kör getAllEvents såfort nån dependencys har uppdaterats
//useEffect(func, dependencyarray)
  useEffect(()=>{
      getAllEvents()
  }, []);

  return (
    <Context.Provider value={{deleteEvent, activeDay, setActiveDay, events, setEvents, setShowAddDayEvent, showAddDayEvent, addEventToDb}}>

{/* Så länge activeDay inte är false, undefined, null, 0, "" så kommer det efter && att göras */}
    <Container>
      <Row>
      {activeMonth > -1 && <Month month={months[activeMonth]} />}

      {activeDay && <DayDetails day={activeDay}/>} 
      {activeDay && showAddDayEvent && <AddEventForm day={activeDay}/>} 
      </Row>
    <Row>
      <div className={"year-pie"}>
      <PieChart
        background="#04703c"
        data={monthArray}
        paddingAngle={2}
        label={(labelProps) => labelProps.dataEntry.title}
        labelPosition={100 / 2}
        labelStyle={{
          fill: "#04703c",
          pointerEvents: "none",
          fontSize: "4px",
          fontWeight: "bold"
        }}
        onClick={onClick}
      />
      </div>
    
    </Row>

</Container>
    </Context.Provider>
  );
};

export default Calendar;
