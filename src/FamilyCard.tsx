import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Container, Image } from "react-bootstrap";
import PartnerInfo from "./PartnerInfo";

interface FamilyCardProps {
    owners: String;
    imageName: String;
  }
const FamilyCard: React.FC<FamilyCardProps> = ({owners, imageName}) => {
  
  const [showPartnerInfo, setShowPartnerInfo] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setShowPartnerInfo(!showPartnerInfo);
  }
  return (
    <>
      <div className={"fam-card "}>
        <div onClick={handleClick}>
          { !showPartnerInfo && <> <Image className="fam-card-img" src={window.location.origin + '/' + imageName} />
              <h3 className="fam-card-header">{owners}</h3></> }
        </div>
        {showPartnerInfo && <PartnerInfo owners={owners} onclick={ handleClick}/>}
      </div>
   </>
  );
};

export default FamilyCard;
