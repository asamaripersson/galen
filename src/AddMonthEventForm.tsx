import React, { useState, useContext  } from "react";
import { format, startOfDay, endOfDay, addDays } from "date-fns";
import svLocale from "date-fns/locale/sv";
import { useForm } from 'react-hook-form';
import { Context, DayEvent } from './Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";

interface AddMonthEventFormProps {
  day?: Date;
}

const AddMonthEventForm: React.FC<AddMonthEventFormProps> = () => {
 
  const { register, handleSubmit } = useForm();
  const { addMonthEventToDb, addMonthEvent, setAddMonthEvent } = useContext(Context);

  const onSubmit = data => {
    addMonthEventToDb(data);
    setAddMonthEvent(false);
  };
  const handleClose = () => setAddMonthEvent(false);
  const fromDate = format( Date.now(), "yyyy-MM-dd", { locale: svLocale });
  const toDate = format(startOfDay(addDays( Date.now(), 10)), "yyyy-MM-dd", { locale: svLocale });
  return (
    <>
     <Modal show={addMonthEvent} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Skapa månadsevent</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className={"add-event-form"}>
        <div>
            <label htmlFor="startDate">Från</label>
            <Form.Control type="date" name="startDate" placeholder={fromDate} ref={register}/>
        </div>
        <div>
            <label htmlFor="andDate">Till</label>
            <Form.Control type="date" name="endDate" placeholder={toDate} ref={register} />
        </div>
        <div>
            <label htmlFor="title">Titel</label>
            <Form.Control type="text" name="title" ref={register} />
        </div>
        <div>
          <label htmlFor="description">Beskrivning</label>
          <Form.Control as="textarea" name="description" ref={register} />
        </div>
        <div>
            <p>Välj kategori för eventet</p>     
            <select multiple name="tags" ref={register}>
                <option value="harvest">Skörda</option>
                <option value="plant">Odla</option>
            </select>
        </div>
        <div>
            <p>För vilka klimatzoner gäller eventet?</p>     
            <select multiple name="geoZones" ref={register}>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </div>

        <Button type="submit">Submit</Button>
        </Form>
        </Modal.Body>
    </Modal>
    </>
  );
};

export default AddMonthEventForm;
