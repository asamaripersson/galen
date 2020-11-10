import React, { useContext  } from "react";
import svLocale from "date-fns/locale/sv";
import { format, isWithinInterval } from "date-fns";
import {Context} from './Context';


interface DayButtonPropps {
    day:Date;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const DayButton: React.FC<DayButtonPropps> = ({ day, ...rest }) => {

    const numberOfDay = format(day, "dd", { locale: svLocale });
    const { events } = useContext(Context);

return <>
    <button {...rest}>
        <div className="day-number">{numberOfDay}</div>
        <div>
          {events && events.map((dayEvent)=>(
            <p key={dayEvent.title}>{dayEvent.title} </p>
          ))}
        </div>
    </button>  
    </>
  }

  export default DayButton;