import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Button, Container, Image } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { Context, DayEvent } from './Context';
import { Form } from "react-bootstrap";

const Protocol: React.FC= () => {
 
    const { register, handleSubmit } = useForm();
     const onSubmit = data => {
         console.log("submittat!");
    };

  return (
    <>
          <Container className="ronnskar-page-container">
              <Row>
                  <Col className="align-self-start">
                      <div>
                          <h2>Mötesprotokoll</h2>
                          <p>
                              Här kan man läsa och ladda upp protokoll från möten.
                          </p>
                          <Form onSubmit={handleSubmit(onSubmit)} className={"protocol-form"}>
                               <Form.Group>
                                  <Form.File id="exampleFormControlFile1" label="Example file input" />           
                              </Form.Group>
                    {/* <p className={errorClass(formErrors.title)}> {formErrors.title}</p> */}
                    
                              <div className="row">
                                  <div className="form-group col col-12 col-lg-3">
                                      <Button type="submit">Submit</Button>
                                  </div>
                              </div>
                          </Form>
                      </div>
                  </Col>
                  
                  <Col className="align-self-end">
                      <h3>Uppladdade protokoll</h3>
                      <ul>
                          <li>oktober 2019</li>
                          <li>mars 2019</li>
                          <li>2020</li>
                      </ul>
                  </Col>
              </Row>
          </Container>
   </>
  );
};

export default Protocol;
