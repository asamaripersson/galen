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
      <tr className="week">
        {eachDayInWeek.map((d) => (
          <Day day={d} key={d.toString()} />
        ))}
      </tr>
    </>
  );
};

export default Week;
