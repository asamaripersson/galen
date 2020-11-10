import React, { useState, useEffect } from "react";
import Month from "./Month";
import { PieChart } from "react-minimal-pie-chart";
import svLocale from "date-fns/locale/sv";
import { eachMonthOfInterval, format } from "date-fns";
import DayDetails from './DayDetails';
import { Context, DayEvent } from './Context';

const Calendar: React.FC = () => {

  const [activeMonth, setActiveMonth] = useState(-1);
  const [activeDay, setActiveDay] = useState<Date | undefined>();
  const [activeEvents, setActiveEvents] = useState<DayEvent[] | undefined>();

  const [events, setEvents] = useState([]);
  const getAllEvents = async()=>{
    const result = await fetch("http://localhost:3001/events");
    const data = await result.json();
    console.log(data);
    setEvents(data);
  }

  const months = eachMonthOfInterval({
    start: new Date(2020, 0, 1),//första januari detta år
    end: new Date(2020, 11, 30),//sista dec detta år
  });

  const monthArray = months.map((month) => ({
    title: format(month, "MMMM", { locale: svLocale }),
    value: 1 / 12,
    color: "#00FF00",
  }));

  const onClick = (_: React.MouseEvent, index: number) => {
    setActiveMonth(index);
  };

// useEffect ser till att vi bara kör getAllEvents såfort nån dependencys har uppdaterats
//useEffect(func, dependencyarray)
  useEffect(()=>{
      getAllEvents()
  }, []);

  return (
    <Context.Provider value={{activeDay, setActiveDay, events, setActiveEvents, activeEvents}}>

{/* Så länge activeDay inte är false, undefined, null, 0, "" så kommer det efter && att göras */}
      {activeDay && <DayDetails day={activeDay} eventsForToday={activeEvents}/>} 

      {activeMonth > -1 && <Month month={months[activeMonth]} />}

      <PieChart
        data={monthArray}
        paddingAngle={2}
        label={(labelProps) => labelProps.dataEntry.title}
        labelPosition={100 / 2}
        labelStyle={{
          fill: "#fff",
          opacity: 0.75,
          pointerEvents: "none",
          fontSize: "2px",
        }}
        onClick={onClick}
      />
    </Context.Provider>
  );
};

export default Calendar;
