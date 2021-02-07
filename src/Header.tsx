import React from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
const Header: React.FC= () => {
 
  return (
    <>
      <Navbar>
        <Navbar.Brand className="h1" href="/">Rönnskär</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="/boka">Bokning</Nav.Link>
          <Nav.Link href="/ronnskar">Vi på Rönnskär</Nav.Link>
          <Nav.Link href="/protokoll">Protokoll</Nav.Link>
        </Navbar.Collapse>
      </Navbar>
   </>
  );
};

export default Header;
