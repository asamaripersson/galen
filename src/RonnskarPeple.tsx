import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Container, Image } from "react-bootstrap";
import FamilyCard from "./FamilyCard";

const RonnskarPeople: React.FC= () => {
 
  return (
    <>
   <Container className="ronnskar-page-container">
    <Row>
      <Col className="align-self-start">
        <FamilyCard owners={"Maud och Camilla"} imageName={"jump.jpg"} bgColor={"brown"}/>
      </Col>

      <Col className="align-self-end">
        <FamilyCard owners={"Klas"} imageName={"sunset.jpg"} bgColor={"blue"}/>
      </Col>
    </Row>
      
    <Row>
      <Col className="align-self-start">
        <FamilyCard owners={"Östlund"} imageName={"tree.jpg"} bgColor={"red"} />
      </Col>

      <Col className="align-self-end">
        <FamilyCard owners={"Bengt"} imageName={"adventure.jpg"} bgColor={"green"}/>
      </Col>
    </Row>
   </Container>
   </>
  );
};

export default RonnskarPeople;
