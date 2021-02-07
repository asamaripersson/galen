import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Container, Image } from "react-bootstrap";

interface PartnerInfoProps {
  owners: String;
  onclick: (event: React.MouseEvent<HTMLDivElement>) => void;
  }
const PartnerInfo: React.FC<PartnerInfoProps> = ({owners, onclick}) => {
  
  const [showPartnerInfo, setShowPartnerInfo] = useState(false);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setShowPartnerInfo(!showPartnerInfo);
  //   console.log("jahapp");
  // }
  let infoText = "";
  
  switch (owners) {
    case "Maud och Camilla":
       infoText = `<p><strong> Maud Lyberg</strong>, man Bertil. Tel 070 123123 </p>
        <p> Dotter Karin xxx, man Jocke, son Oliver. Tel 070 123123 </p>
        <p> Son Andreas Lyberg. Kan grävskopa! Tel 070 123123 </p>

        <p> <strong>Camilla Persson</strong>, man Tomas. Tel 070 123123 </p>
        <p> Dotter Åsa Persson, sambo Eric, Tel 070 123123 </p>
        <p> Dotter Pia Persson, sambo Johnny. Barn Felix, Dante och Dominik Tel 070 123123 </p>
        <p> Dotter Ewa Persson, sambo Marcus. Barn Charlie Tel 070 123123 </p>`;
      break;
    default:
      infoText = `<p>Inte satt</p>`;
      break;
  }
  function createMarkup() { return {__html: infoText}; };
  return (
    <>
      <div className={"partner-info"}>
        <div className="close-partner-btn" onClick={onclick}>
          <button>
          <i className="bi bi-x-circle-fill"></i>
          </button> 
        </div>
        
        <h1>{owners}</h1>
        <div>
          <div dangerouslySetInnerHTML={createMarkup()} />
        </div>
       
        
        {/* <p> Maud Lyberg, man Bertil. Tel 070 123123 </p>
        <p> Dotter Karin xxx, man Jocke, son Oliver. Tel 070 123123 </p>
        <p> Son Andreas Lyberg. Kan grävskopa! Tel 070 123123 </p>

        <p> Camilla Persson, man Tomas. Tel 070 123123 </p>
        <p> Dotter Åsa Persson, sambo Erik, Tel 070 123123 </p>
        <p> Dotter Pia Persson, sambo Johnny. Barn Felix, Dante och Dominik Tel 070 123123 </p>
        <p> Dotter Ewa Persson, sambo Marcus. Barn Charlie Tel 070 123123 </p> */}

      </div>
   </>
  );
};

export default PartnerInfo;
