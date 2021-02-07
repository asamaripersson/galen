import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Button, Container, Image } from "react-bootstrap";

const Home: React.FC= () => {
 
  return (
    <>
          <Container className="ronnskar-page-container">
              <Row>
                  <Col className="align-self-start">
                      <div>
                          <h2>Välkommen till Rönnskärs hemsida</h2>
                          <p>
                               Här kan man läsa protokoll, läsa om alla oss som är en del av Rönnskär. Vill ni lägga till mer text eller har ni en bild som ni vill använda? Maila Åsa.
                          </p>
                      </div>
                  </Col>
                  
                  <Col className="align-self-end">
                      <Image className="fam-card-img" src={window.location.origin + '/tree.jpg'} />
                  </Col>
              </Row>

              <Row>
                  <Col className="align-self-start">
                      <div>
                          <p>
                              Man kan även se när ön är upptagen och boka ön.
                                 Använd knappen till höger.
                          </p>
                      </div>
                  </Col>
                  
                  <Col className="align-self-end">
                      <Button size="lg" className="go-to-book btn">GÅ TILL BOKNINGSKALENDERN</Button>
                  </Col>
              </Row>
          </Container>
   </>
  );
};

export default Home;
