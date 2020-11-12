import { Context } from './Context';
import React, { useContext  } from "react";

// export const GetEventInDateRange = (from:Date, to:Date):DayEvent[] => {
//     //galenApi/eventByDates?from=from&to=to
//     return 
// };
//const {setEvents} = useContext(Context);
export const getAllEvents = async()=>{
    const result = await fetch("http://localhost:3001/events");
    const data = await result.json();
   // setEvents(data);
  }