import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Container, Image } from "react-bootstrap";

interface FamilyCardProps {
    owners: String;
    imageName: String;
    bgColor: String;
  }
const FamilyCard: React.FC<FamilyCardProps> = ({owners, imageName, bgColor}) => {
 
  return (
    <>
        <div className={"fam-card "+ bgColor}>
            
            <div>
                <Image className="fam-card-img" src={window.location.origin + '/' + imageName}/>
              <h3 className="fam-card-header">{owners}</h3>
            </div>

        </div>
   </>
  );
};

export default FamilyCard;
