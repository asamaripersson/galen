import React, { useState, Component, MouseEvent  } from "react";
import svLocale from "date-fns/locale/sv";
import { format } from "date-fns";


interface DayDetailsPropps {
    day:Date;
}
const DayDetails: React.FC<DayDetailsPropps> = ({ day }) => {
    const dateOfDay = format(day, "dd MMMM yyyy", { locale: svLocale });
    const nameOfDay = format(day, "EEEE", {locale:svLocale});
    return <>
        <div className="day-datails">
        <p className="day-number">{nameOfDay} {dateOfDay}</p>
        hej en dag med alla event å taggar här tack
        </div>  
        </>
    }

  export default DayDetails;