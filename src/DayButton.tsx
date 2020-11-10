import React, { useContext  } from "react";
import svLocale from "date-fns/locale/sv";
import { format } from "date-fns";
import { DayEvent } from './Context';


interface DayButtonPropps {
    day:Date;
    eventsOfDay:DayEvent[];
    onClick: (DayEvent: React.MouseEvent<HTMLButtonElement>) => void;
}
const DayButton: React.FC<DayButtonPropps> = ({ day, eventsOfDay, ...rest }) => {
    const numberOfDay = format(day, "dd", { locale: svLocale });

return <>
    <button {...rest}>
        <div className="day-number">{numberOfDay}</div>
        <div>
          {eventsOfDay?.map((dayEvent)=>(
             <p key={dayEvent.title}>{dayEvent.title} </p>
          ))}
        </div>
    </button>  
    </>
  }

  export default DayButton;