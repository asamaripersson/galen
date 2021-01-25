import React, { useState, useContext  } from "react";
import { format, startOfDay, addDays } from "date-fns";
import svLocale from "date-fns/locale/sv";
import { useForm } from 'react-hook-form';
import { Context, DayEvent } from './Context';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";

interface AddEventFormProps {
  day?: Date;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ day }) => {
  if (!day) {
    return null;
  }
  const dateOfDay = format(day, "dd MMMM yyyy", { locale: svLocale });
  const {setActiveDay, events} = useContext(Context);

  const nameOfDay = format(day, "EEEE", {locale:svLocale});
  const { register, handleSubmit } = useForm();
  const { addEventToDb, showAddDayEvent, setShowAddDayEvent } = useContext(Context);

  const onSubmit = data => {
    if (!isValid(formErrors)) { return;}
    addEventToDb(data);
    setShowAddDayEvent(false);
  };

  let isValid = (obj) => Object.entries(obj).reduce((acc, [, value]) => acc && value === "", true);
  
  const handleClose = () => setShowAddDayEvent(false);
  
  const [description, setDescription] = useState("");
  
  let [descriptionValid, setDescriptionValid] = useState(false);
  let [startDate, setStartDate] = useState(format( Date.now(), "yyyy-MM-dd", { locale: svLocale }));
  let [startDateValid, setStartDateValid] = useState(false);
  let [endDate, setEndDate] = useState(format(startOfDay(addDays( Date.now(), 10)), "yyyy-MM-dd", { locale: svLocale }));
  let [endDateValid, setEndDateValid] = useState(false);
  
  let [formErrors, setFormErrors] = useState({ description: '', startDate: '', endDate: '' });

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateField(name, value);
  }

  const validateField= (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let descValid = descriptionValid;
    let startValid = startDateValid;
    let endValid = endDateValid;

    switch(fieldName) {
      case 'description':
        setDescription(value);
        console.log("i valid field, desccc", fieldName, value);
        descValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.description = descriptionValid ? '' : ' is invalid';
        break;
      case 'startDate':
        setStartDate(value);
        startValid = new Date(value) <= new Date(endDate);
        fieldValidationErrors.startDate = startValid ? '' : 'startNOvalid';

        endValid = new Date(endDate) >= new Date(value);
        fieldValidationErrors.endDate = endValid ? '' : 'endNovalid';
        break;
      case 'endDate':
        setEndDate(value);
        endValid = new Date(value) >= new Date(startDate);
        fieldValidationErrors.endDate = endValid ? '' : 'endNovalid';

        startValid = new Date(startDate) <= new Date(value);
        fieldValidationErrors.startDate = startValid ? '' : 'startNOvalid';
      default:
        break;
    }
    setFormErrors(fieldValidationErrors);
    setDescriptionValid(descValid);
    setStartDateValid(startValid);
    setEndDateValid(endValid);
  }
  const errorClass = (error) => {
    console.log("errrroeclass ",error);
    return (error.length === 0 ? 'success' : 'has-error');
  }

  return (
    <>
     <Modal show={showAddDayEvent} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Skapa event för {nameOfDay} {dateOfDay}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} className={"add-event-form"}>
        
            <div className={`form-group ${errorClass(formErrors.startDate)}`}>
              <label htmlFor="startDate">Från</label>
              <Form.Control type="date" name="startDate" defaultValue={startDate} ref={register} onChange={handleUserInput} />
            </div>
            
            <div className={`form-group ${errorClass(formErrors.endDate)}`}>
              <label htmlFor="andDate">Till</label>
              <Form.Control type="date" name="endDate" defaultValue={endDate} ref={register} onChange={handleUserInput} />
            </div>
        <div>
            <label htmlFor="title">Titel</label>
            <Form.Control type="text" name="title" ref={register} />
            </div>
            
            <div className={`form-group ${errorClass(formErrors.description)}`}>
              <label htmlFor="description">Beskrivning</label>
              <Form.Control as="textarea" name="description" value={description} ref={register} onChange={handleUserInput}/>
            </div>
            
        <div>
            <Form.Check 
              type={"checkbox"}
                label={`Vill ni ha hela ön för er själva? `}
                ref={register}
                name={'private'}
            />
          </div>

        <Button type="submit">Submit</Button>
        </Form>
        </Modal.Body>
    </Modal>
    </>
  );
};

export default AddEventForm;
