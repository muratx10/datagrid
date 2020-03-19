import FigureImage from 'react-bootstrap/FigureImage';
import React from 'react';
import visa from '../../assets/visa.png';
import mastercard from '../../assets/mastercard.svg.png';
import maestro from '../../assets/maestro.svg.png';

const cardImg = (type) => {
  switch (type) {
    case 'Visa':
      return (
        <FigureImage
          src={visa}
          alt="VISA logo"
          className="cardLogo"
        />
      );
    case 'Mastercard':
      return (
        <FigureImage
          src={mastercard}
          alt="MasterCard logo"
          className="cardLogo"
        />
      );
    case 'Maestro':
      return (
        <FigureImage
          src={maestro}
          alt="VISA logo"
          className="cardLogo"
        />
      );
    default: return 'CARD NAME';
  }
};

export default cardImg;
