import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Container, Image } from "react-bootstrap";
import Calendar from "./Calendar";
const Header: React.FC= () => {
 
  return (
    <>
    <Container>
       <Row>
     <Col className="align-self-center md-3">
      <h1>Vi på Rönnskär</h1>
     </Col>

     <Col className="md-6">
      <Image className="map-img" src={window.location.origin + '/sverige.png'}/>
    </Col>

     <Col className="align-self-center md-3">
      <a href="#">Boka</a>

     </Col>
   </Row>
   </Container>

   <Container>
<Row>
  <Col className="family-card">
    <Image></Image>
    <div>
    <p>Maud å Camilla</p>
    </div>
   
  </Col>
</Row>
   </Container>
   </>
  );
};

export default Header;
