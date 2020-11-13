import React, { useState, useContext  } from "react";
import { format, startOfDay, endOfDay } from "date-fns";
import svLocale from "date-fns/locale/sv";
import { useForm } from 'react-hook-form';
import { Context, DayEvent } from './Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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
  const { addEventToDb, showAddDayEvent, setShowAddDayEvent } = useContext(Context);

  const onSubmit = data => {
    addEventToDb(data);
    setShowAddDayEvent(false);
  };
  const handleClose = () => setShowAddDayEvent(false);

  return (
    <>
     <Modal show={showAddDayEvent} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Skapa event för {nameOfDay} {dateOfDay}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className={"add-event-form"}>
        <div>
            <input name="startDate" value={startDate} ref={register} hidden/>
        </div>
        <div>
            <input name="endDate" value={endDate} ref={register} hidden />
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

        <Button type="submit">Submit</Button>
        </form>
        </Modal.Body>
    </Modal>
    </>
  );
};

export default AddEventForm;
