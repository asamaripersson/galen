import React, { useContext  } from "react";
import svLocale from "date-fns/locale/sv";
import { format, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import {Context} from './Context';


interface DayButtonPropps {
    day:Date;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const DayButton: React.FC<DayButtonPropps> = ({ day, ...rest }) => {
    const numberOfDay = format(day, "dd", { locale: svLocale });
    const { events } = useContext(Context);//Hämtar event från context

const filteredEvents = events?.filter((e)=>{
 return isWithinInterval(day,{start:startOfDay(new Date(e.startDate)), end:endOfDay(new Date(e.endDate))})
});

return <>
    <button {...rest}>
        <div className="day-number">{numberOfDay}</div>
        <div>
          {filteredEvents?.map((dayEvent)=>(
             <p key={dayEvent.title}>{dayEvent.title} </p>
          ))}
        </div>
    </button>  
    </>
  }

  export default DayButton;