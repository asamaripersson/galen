import React, { useState, Component, MouseEvent  } from "react";
import svLocale from "date-fns/locale/sv";
import { format } from "date-fns";
import {GetEventInDateRange, Event} from "./event-service";


interface DayDetailsPropps {
    day:Date;
}
const DayDetails: React.FC<DayDetailsPropps> = ({ day }) => {
return <>
    <div className="day-datails">
       hej en dag med alla event å taggar här tack
    </div>  
    </>
  }

  export default DayDetails;