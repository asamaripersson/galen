import React from "react";
import { lastDayOfWeek, eachDayOfInterval } from "date-fns";
import Day from "./Day";

interface WeekProps {
  startDay?: Date;
}

const Week: React.FC<WeekProps> = ({ startDay }) => {
  if (!startDay) {
    return null;
  }
  const eachDayInWeek = eachDayOfInterval({
    start: startDay,
    end: lastDayOfWeek(startDay),
  });
  return (
    <>
      <tr key={Math.floor(Math.random() * Math.floor(9999999))} className="week">
        {eachDayInWeek.map((d) => (
          <Day day={d} key={d.toString()+ + Math.floor(Math.random() * Math.floor(9999999))} />
        ))}
      </tr>
    </>
  );
};

export default Week;
