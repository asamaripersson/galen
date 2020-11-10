import React, { useState, useContext  } from "react";
import DayButton from "./DayButton";
import {Context} from './Context';

interface DayProps {
  day?: Date;
}

const Day: React.FC<DayProps> = ({ day }) => {

  const {setActiveDay} = useContext(Context);
  if (!day) {
    return null;
  }

  const handleClick =(event:React.MouseEvent<HTMLElement>)=> {
    setActiveDay(day);
  }
  return (
    <>
      <td className="day">
        <DayButton day={day} onClick={handleClick}></DayButton>
      </td>
    </>
  );
};

export default Day;
