import React, { useContext  } from "react";
import svLocale from "date-fns/locale/sv";
import { format } from "date-fns";
import { DayEvent } from './Context';

interface DayButtonPropps {
    day:Date;
    eventsOfDay:DayEvent[];
    onClick: (DayEvent: React.MouseEvent<HTMLDivElement>) => void;
}
const DayButton: React.FC<DayButtonPropps> = ({ day, eventsOfDay, ...rest }) => {

  const deleteEvent = async(id:string)=>{
    
    const result = await fetch("http://localhost:3001/events/"+id,
    {method:"DELETE"});
    const data = await result.json();
    console.log("deleted? ", data);
    //setEvents(data); add to context
  }

  const handleRemoveEventClick =(event:React.MouseEvent<HTMLElement>)=> {
    console.log("remove event click in daybutton ", (event.target as HTMLInputElement).value);
    deleteEvent((event.target as HTMLInputElement).value);
  }
    const numberOfDay = format(day, "dd", { locale: svLocale });

return <>
    <div {...rest}>
        <div className="day-number">{numberOfDay}</div>
        <div>
          {eventsOfDay?.map((dayEvent)=>(
            <>
             <p key={dayEvent.title}>{dayEvent.title} </p>
             <button key={dayEvent.description} onClick={handleRemoveEventClick} value={dayEvent.id} className="remove-event">&#8211;</button>
             </>
          ))}
        </div>
    </div>  
    </>
  }

  export default DayButton;