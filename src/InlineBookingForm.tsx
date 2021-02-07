import React, { useState, useContext  } from "react";
import { format, isWithinInterval } from "date-fns";
import svLocale from "date-fns/locale/sv";
import { useForm } from 'react-hook-form';
import { Context, DayEvent } from './Context';
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";

interface InlineBookingFormPropps {
    day:Date;
}

const InlineBookingForm: React.FC<InlineBookingFormPropps> = ({ day }) => {
    if (!day) {
        return null;
    }
    const { register, handleSubmit } = useForm();
    const { addEventToDb, activeStartDay, setActiveStartDay, activeEndDay, setActiveEndDay, events } = useContext(Context);

    const privateEvents = events.filter((dayEvent) => { return dayEvent.private });//ta färre. tex detta år?
    let whithinPrivateEvents = [];
 
    const onSubmit = data => {
        //if (!isValid(formErrors)) { return;}
        if (!validateForm(data)) { return; }
        addEventToDb(data);
       // setShowAddDayEvent(false);
        setActiveStartDay(null);
        setActiveEndDay(null);
        setTitle("");
    };

    const validateForm = (data) => {
        var firstDate = new Date(data.startDate);
        var laststDate = new Date(data.endDate);
        validateField("title", data.title);
        validateField("startDate", data.startDate);
        validateField("endDate", data.endDate);
        validateField("whithinPrivateBookings", "");     
        console.log("valierat ", formErrors.whithinPrivateBookings);
        //det ska inte gå att fylla i privat om det redan finns halvbokningar
        return (firstDate <= laststDate && data.title.length >= 1 && formErrors.whithinPrivateBookings == "");
    }
    let isValid = (obj) => Object.entries(obj).reduce((acc, [, value]) => acc && value === "", true);
    
    const [title, setTitle] = useState("");
    let [titleValid, setTitleValid] = useState(false);
    let [startDateValid, setStartDateValid] = useState(false);
    let [endDateValid, setEndDateValid] = useState(false);
    let [whithinPrivateEventsValid, setWhithinPrivateEventsValid] = useState(false);
    let [formErrors, setFormErrors] = useState({ title: '', startDate: '', endDate: '', whithinPrivateBookings:'' });

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateField(name, value);
  }

  const validateField= (fieldName, value) => {
      let fieldValidationErrors = formErrors;
      let whithinPrivateValid = whithinPrivateEventsValid;
      let titlenValid = titleValid;
      let startValid = startDateValid;
      let endValid = endDateValid;

      switch (fieldName) {
          case 'whithinPrivateBookings':
              if (activeEndDay != null && activeStartDay != null) {
                     whithinPrivateEvents = privateEvents.filter((dayEvent) => {
                         return isWithinInterval(new Date(dayEvent.startDate), {
                             start: activeStartDay, end: activeEndDay
                         })
                     });
                  if (whithinPrivateEvents.length == 0) {
                      whithinPrivateValid = true;
                  } else {
                      whithinPrivateValid = false;
                  }
              }
              fieldValidationErrors.whithinPrivateBookings = whithinPrivateValid ? '' : 'Du har valt dagar som är fullbokade.';
              break;
          case 'title':
              setTitle(value);
              console.log("i valid field, TITLE", value.length, value);
              titlenValid = value.length >= 1;
              fieldValidationErrors.title = titleValid ? '' : 'Måste fyllas i';
              break;
          
          case 'startDate':
             setActiveStartDay(new Date(value));
              startValid = new Date(value) <= activeEndDay;
              fieldValidationErrors.startDate = startValid ? '' : 'Ange datum i format åååå-mm-dd';
              endValid = activeEndDay >= new Date(value);
              fieldValidationErrors.endDate = endValid ? '' : 'Ange datum i format åååå-mm-dd';
              break;
          case 'endDate':
             setActiveEndDay(new Date (value));
              endValid = new Date(value) >= new Date(activeStartDay);
              fieldValidationErrors.endDate = endValid ? '' : 'Ange datum i format åååå-mm-dd';

              startValid = new Date(activeStartDay) <= new Date(value);
              fieldValidationErrors.startDate = startValid ? '' : 'Ange datum i format åååå-mm-dd';
          default:
              break;
      }
      
      setFormErrors(fieldValidationErrors);
      setWhithinPrivateEventsValid(whithinPrivateValid);
      setTitleValid(titlenValid);
      setStartDateValid(startValid);
      setEndDateValid(endValid);
    }
    
    const errorClass = (error) => {
    return (error.length === 0 ? 'success' : 'has-error');
  }
    
    return <>
        <div className="inline-booker" >
            <Form onSubmit={handleSubmit(onSubmit)} className={"inline-form bg-green"}>
                <div className="row">
                    <p className={errorClass(formErrors.whithinPrivateBookings)}> {formErrors.whithinPrivateBookings}</p>

                    <div className={`form-group col col-12 col-lg-3  ${errorClass(formErrors.startDate)}`}>
                    <label className="form-label" htmlFor="startDate">Från </label>
                        <Form.Control type="date" name="startDate" value={activeStartDay ? format(activeStartDay, "yyyy-MM-dd", { locale: svLocale }) : null} ref={register} onChange={handleUserInput} />
                        <p className={errorClass(formErrors.startDate)}> {formErrors.startDate}</p>
                    </div>

                    <div className={`form-group col col-12 col-lg-3 ${errorClass(formErrors.endDate)}`}>
                        
                    <label className="" htmlFor="endDate">Till </label>
                        <Form.Control type="date" name="endDate" value={activeEndDay ? format(activeEndDay, "yyyy-MM-dd", { locale: svLocale }) : null} ref={register} onChange={handleUserInput} />
                        <p className={errorClass(formErrors.endDate)}> {formErrors.endDate}</p>
                </div>

                    <div className={`form-group col col-12 col-lg-3 ${errorClass(formErrors.title)}`}>
                        
                    <label htmlFor="title">Namn</label>
                        <Form.Control type="text" name="title" value={title} onChange={handleUserInput} ref={register} />
                         <p className={errorClass(formErrors.title)}> {formErrors.title}</p>
                </div>
            
                    <div className="form-group col col-12 col-lg-3">
                        <label htmlFor="description">Beskrivning</label>
                    <Form.Control as="textarea" name="description" ref={register} />
                    <p className={errorClass(formErrors.title)}> {formErrors.title}</p>
                    
                    </div>      
                </div>
                <div className="row">
                    <div className="form-group col col-12 col-lg-4"> 
                        <Form.Check 
                        type={"checkbox"}
                        label={`Vill ni ha hela ön för er själva? `}
                        ref={register}
                        name={'private'}
                        />
                    </div>
                </div>
                
                <div className="row">
                    <div className="form-group col col-12 col-lg-3">
                    <Button disabled = {activeStartDay == null || setActiveEndDay == null || title == ""} type="submit">Submit</Button>
                    </div>
                </div>
                
            </Form>
        </div>  
    </>
}

export default InlineBookingForm;