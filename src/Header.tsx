import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Container, Image } from "react-bootstrap";
import Calendar from "./Calendar";
const Header: React.FC= () => {
 
  return (
    <>
    <Container className="header-container">
      <Row>
        <Col className="align-self-center md-3">
          <a className="nav-link" href="/ronnskar">Vi på Rönnskär</a>
        </Col>

      <Col className="md-6">
        <Image className="map-img" src={window.location.origin + '/ronnskarPlaceholder.gif'}/>
      </Col>

      <Col className="align-self-center md-3">
        <a className="nav-link" href="/boka">Boka</a>
      </Col>
    </Row>
   </Container>
   </>
  );
};

export default Header;
