import React, { useState, useContext  } from "react";
import { format, startOfDay, endOfDay } from "date-fns";
import svLocale from "date-fns/locale/sv";
import { useForm } from 'react-hook-form';
import { Context, DayEvent } from './Context';

interface AddEventFormProps {
  day?: Date;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ day }) => {
  if (!day) {
    return null;
  }
  const dateOfDay = format(day, "dd MMMM yyyy", { locale: svLocale });
  const startDate = format(startOfDay(day), "yyyy-MM-dd", { locale: svLocale });
  const endDate = format(endOfDay(day), "yyyy-MM-dd", { locale: svLocale });

  const nameOfDay = format(day, "EEEE", {locale:svLocale});
  const { register, handleSubmit } = useForm();
  const { addEventToDb } = useContext(Context);

  const onSubmit = data => {
    //alert(JSON.stringify(data));
    addEventToDb(data);
  };
  return (
    <>
        <h4 className="day-number">Skapa event för {nameOfDay} {dateOfDay}</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="startDate">Från datum</label>
            <input name="startDate" value={startDate} ref={register} />
        </div>
        <div>
            <label htmlFor="endDate">Från datum</label>
            <input name="endDate" value={endDate} ref={register} />
        </div>
        <div>
            <label htmlFor="title">Titel</label>
            <input name="title" ref={register} />
        </div>

        <div>
          <label htmlFor="description">Beskrivning</label>
          <textarea name="description" ref={register} />
        </div>

        <div>
            <p>Välj kategori för eventet</p>     
            <select multiple name="tags" ref={register}>
                <option value="harvest">Skörda</option>
                <option value="plant">Odla</option>
            </select>
        </div>


        <button type="submit">Submit</button>
        </form>
    </>
  );
};

export default AddEventForm;
