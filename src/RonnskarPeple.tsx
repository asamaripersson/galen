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
          <h2>Vi på Rönnskär</h2>
        </Row>
          <Row>
          <p>Vilka är alla andra? Åren går och familjer förändras. Vi träffas aällan.
           Den här sidan är tänkt som en presentation för alla. Vad vill ni att det stå om just er del?
            Skicka text och ev bilder till  <a href="mailto:asamaripersson@gmail.com">Åsa</a>.
          </p>
        </Row>
        
    <Row>
      <Col className="align-self-start">
            <FamilyCard owners={"Maud och Camilla"} imageName={"jump.jpg"} />
      </Col>

      <Col className="align-self-end">
        <FamilyCard owners={"Klas och Bengt"} imageName={"sunset.jpg"}/>
      </Col>
    </Row>
      
    <Row>
      <Col className="align-self-start">
        <FamilyCard owners={"Östlund/Jääaro"} imageName={"tree.jpg"} />
      </Col>

      <Col className="align-self-end">
        <FamilyCard owners={"Keno"} imageName={"adventure.jpg"} />
      </Col>
    </Row>
   </Container>
   </>
  );
};

export default RonnskarPeople;
