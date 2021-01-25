import React, { useState, useContext  } from "react";
import { format, startOfDay, addDays } from "date-fns";
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
    const { addEventToDb, activeStartDay, activeEndDay, setActiveEndDay, setShowAddDayEvent } = useContext(Context);

    const onSubmit = data => {
        //if (!isValid(formErrors)) { return;}
        if (!validateForm(data)) { return; }
        addEventToDb(data);
        setShowAddDayEvent(false);
    };

    const validateForm = (data) => {
        var firstDate = new Date(data.startDate);
        var laststDate = new Date(data.endDate);
        validateField("title", data.title);
        validateField("startDate", data.startDate);
        validateField("endDate", data.endDate);
        return (firstDate <= laststDate && data.title.length >= 2);
    }
    let isValid = (obj) => Object.entries(obj).reduce((acc, [, value]) => acc && value === "", true);
    
    const [title, setTitle] = useState("");
    let [titleValid, setTitleValid] = useState(false);

    const dateOfDay = activeStartDay ? format(activeStartDay, "yyyy-MM-dd", { locale: svLocale }) : null;
    let [startDate, setStartDate] = useState(dateOfDay);
    
    let [startDateValid, setStartDateValid] = useState(false);
    
    const dateOfEndDay = activeEndDay ? format(activeEndDay, "yyyy-MM-dd", { locale: svLocale }) : null;
    
  let [endDate, setEndDate] = useState(dateOfEndDay);
  let [endDateValid, setEndDateValid] = useState(false);
  
  let [formErrors, setFormErrors] = useState({ title: '', startDate: '', endDate: '' });

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    validateField(name, value);
  }

  const validateField= (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let titlenValid = titleValid;
    let startValid = startDateValid;
    let endValid = endDateValid;

      switch (fieldName) {
          case 'title':
              setTitle(value);
              console.log("i valid field, TITLE", value.length, value);
              titlenValid = value.length >= 1;
              fieldValidationErrors.title = titleValid ? '' : 'Måste fyllas i';
        break;
          case 'startDate':
              setStartDate(value);
              startValid = new Date(value) <= new Date(endDate);
              fieldValidationErrors.startDate = startValid ? '' : 'Ange datum i format åååå-mm-dd';
              endValid = new Date(endDate) >= new Date(value);
              fieldValidationErrors.endDate = endValid ? '' : 'Ange datum i format åååå-mm-dd';
              break;
          case 'endDate':
              setEndDate(value);
              endValid = new Date(value) >= new Date(startDate);
              fieldValidationErrors.endDate = endValid ? '' : 'Ange datum i format åååå-mm-dd';

              startValid = new Date(startDate) <= new Date(value);
              fieldValidationErrors.startDate = startValid ? '' : 'Ange datum i format åååå-mm-dd';
          default:
              break;
      }
      
      setFormErrors(fieldValidationErrors);
      setTitleValid(titlenValid);
      setStartDateValid(startValid);
      setEndDateValid(endValid);
    }
    
    const errorClass = (error) => {
    return (error.length === 0 ? 'success' : 'has-error');
  }
    
    return <>
        <div className="inline-booker" >
                <Form onSubmit={handleSubmit(onSubmit)} className={"inline-form"}>        
                <div className={`form-group ${errorClass(formErrors.startDate)}`}>
                    <label htmlFor="startDate">Från
                    <span className={errorClass(formErrors.startDate)}> {formErrors.startDate}</span>
                    </label>
                    
                    <Form.Control type="text" name="startDate" defaultValue="åååå-mm-dd" value={dateOfDay} ref={register} onChange={handleUserInput} />
                </div>

                <div className={`form-group ${errorClass(formErrors.endDate)}`}>
                    <label htmlFor="endDate">Till <span className={errorClass(formErrors.endDate)}> {formErrors.endDate}</span></label>
                    <Form.Control type="text" name="endDate" defaultValue="åååå-mm-dd" value={dateOfEndDay} ref={register} onChange={handleUserInput} />
                </div>

                <div className={`form-group ${errorClass(formErrors.title)}`}>
                    <label htmlFor="title">Titel <span className={errorClass(formErrors.title)}> {formErrors.title}</span></label>
                    <Form.Control type="text" name="title" defaultValue={title} onChange={handleUserInput} ref={register} />
                </div>
            
                <div>
                <label htmlFor="description">Beskrivning</label>
                <Form.Control as="textarea" name="description" ref={register}/>
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
        </div>  
    </>
}

export default InlineBookingForm;