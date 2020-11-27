import React, { useState, useEffect } from "react";
import Month from "./Month";
import { PieChart } from "react-minimal-pie-chart";
import svLocale from "date-fns/locale/sv";
import { eachMonthOfInterval, format, getYear, getMonth } from "date-fns";
import DayDetails from './DayDetails';
import { Context, DayEvent } from './Context';
import AddEventForm from './AddEventForm';
import MonthHeader from './MonthHeader';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from "react-bootstrap";

const Calendar: React.FC = () => {

  //states in context
  const [activeMonth, setActiveMonth] = useState(-1);
  const [activeDay, setActiveDay] = useState<Date | undefined>();
  const [showAddDayEvent, setShowAddDayEvent] = useState(false);
  const [activeZone, setActiveZone] = useState(null);
  const[monthEvents,setMonthEvents] =useState([]);
  const [events, setEvents] = useState([]);

  const getAllMonthEvents = async()=> {
    const result = await fetch("http://localhost:8080/monthEvents");
    const data = await result.json();
   console.log(data);
    setMonthEvents(data);
  }

  const getAllEvents = async()=> {
    const result = await fetch("http://localhost:8080/events");
    const data = await result.json();
    console.log("----",data);
    setEvents(data);
  }
  
  const deleteEvent = async(id:string)=>{
    const result = await fetch("http://localhost:8080/deleteEvent/"+id,
    {method:"DELETE"});
    const data = await result.json();
  
    getAllEvents();
  }
  const addEventToDb = async(d:FormData)=>{
    const result = await fetch("http://localhost:8080/events/",
    {
      method:"POST",
      body:JSON.stringify(d),
      headers:{"Content-Type": "application/json"}
    });
    const data = await result.json();
    getAllEvents();
  }

  const currentYear = getYear(Date.now());
  
  const months = eachMonthOfInterval({
    start: new Date(currentYear, 0, 1),
    end: new Date(currentYear, 11, 30),
  });

  const monthArray = months.map((month) => ({
    title: format(month, "MMM", { locale: svLocale }),
    value: 1 / 12,
    color: getMonth(month) == getMonth(Date.now()) ? "#06BA63" : "#06BA11",
  }));

  const onClick = (_: React.MouseEvent, index: number) => {
    setActiveMonth(index);
    setActiveDay(null);
  };

// useEffect ser till att vi bara kör getAllEvents såfort nån dependencys har uppdaterats
//useEffect(func, dependencyarray)
  useEffect(()=>{
      getAllEvents(),
      getAllMonthEvents()
  }, []);

  const [activeZoneClass, setActiveZoneClass] = useState("no-zone");
  const [activeZoneButtonText, setActiveZoneButtonText] = useState("Välj zon");

  const handleZoneClick =(event: any)=> {
    setActiveZoneClass("set zoneclass = zone-color-"+event);
    setActiveZoneButtonText("Vald zon: "+event);
    setActiveZone(event);//TODO rätt?
}
return (
<Context.Provider value={{monthEvents, setMonthEvents, activeZone, setActiveZone, deleteEvent, activeDay, setActiveDay, events, setEvents, setShowAddDayEvent, showAddDayEvent, addEventToDb}}>
  <Container>
    <Row>
        <DropdownButton onSelect={handleZoneClick} id="dropdown-zone-button" className={activeZoneClass} title={activeZoneButtonText}>
          <Dropdown.Item id="zone-color-1" className="zone-color-1" eventKey="1">1</Dropdown.Item>
          <Dropdown.Item id="zone-color-2" className="zone-color-2" eventKey="2">2</Dropdown.Item>
          <Dropdown.Item id="zone-color-3" className="zone-color-3" eventKey="3">3</Dropdown.Item>
          <Dropdown.Item id="zone-color-4" className="zone-color-4" eventKey="4">4</Dropdown.Item>
          <Dropdown.Item id="zone-color-5" className="zone-color-5" eventKey="5">5</Dropdown.Item>
          <Dropdown.Item id="zone-color-6" className="zone-color-6" eventKey="6">6</Dropdown.Item>
          <Dropdown.Item id="zone-color-7" className="zone-color-7" eventKey="7">7</Dropdown.Item>
          <Dropdown.Item id="zone-color-8" className="zone-color-8" eventKey="8">8</Dropdown.Item>
          <Dropdown.Item id="zone-color-mountain" className="zone-color-mountain" eventKey="mountain">Fjällregionen</Dropdown.Item>
        </DropdownButton>
    </Row>
    {activeMonth > -1 && <MonthHeader month={months[activeMonth]}/>}
    <Row>
      {activeMonth > -1 && <Month month={months[activeMonth]} />}
      {activeDay && <DayDetails day={activeDay}/>} 
      {activeDay && showAddDayEvent && <AddEventForm day={activeDay}/>} 
    </Row>

    <Row>
      <Col className={"year-pie"}>
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
      </Col>
    
      <Col xs={6} md={4}>
        <Image src={window.location.origin + '/zoner.gif'}/>
      </Col>
    </Row>
  </Container>
</Context.Provider>
  );
};

export default Calendar;
