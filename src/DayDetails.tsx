import React, { useState, Component, MouseEvent  } from "react";
import svLocale from "date-fns/locale/sv";
import { format } from "date-fns";
import {DayEvent} from "./Context";

interface DayDetailsPropps {
    day:Date;
    eventsForToday:DayEvent[]
}
const DayDetails: React.FC<DayDetailsPropps> = ({ day, eventsForToday }) => {
    const dateOfDay = format(day, "dd MMMM yyyy", { locale: svLocale });
    const nameOfDay = format(day, "EEEE", {locale:svLocale});
    return <>
        <div className="day-details" >
        <h2 className="day-number">{nameOfDay} {dateOfDay}</h2>
       
        {eventsForToday?.map((dayEvent)=>{
            return <>
            {dayEvent.tags?.map((tag)=>{
                return <div key={tag} className={`tag ${tag}`}>{tag}</div>
            })}
                <h3 key={dayEvent.title}>{dayEvent.title} </h3>
                <p key={dayEvent.description}>{dayEvent.description}</p>
             </>
        })}
        </div>  
        </>
    }

  export default DayDetails;