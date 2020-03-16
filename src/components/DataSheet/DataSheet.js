import React, { useState } from 'react';
import {
  Badge,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { sort } from '../../store/actions/datasheet';
import './DataSheet.scss';
import RowComponent from '../RowComponent/RowComponent';
import { filterData } from '../../store/selector';

// const RowComponent = ({
//   id, name, gender, birthDate, city, zipcode, bankName, currency, amount, card, statusColor, statusBadge, isActive,
// }) => {
//   const [activeRow, setActiveRow] = useState(false);
//   const style = activeRow ? { backgroundColor: 'lightgray' } : null;
//   const chooseRow = (event) => {
//     setActiveRow(!activeRow);
//     console.log(event.target.id);
//   }

//   return (
//     <Row className="align-items-center row-item" id={id}>
//       <Col className="cell fixedCol fixedCol" xs={2} style={style}>
//         <Checkbox
//           id={id}
//           color="primary"
//           onChange={chooseRow}
//         />
//         <Badge variant="secondary">
//           {id}
//         </Badge>
//         &nbsp;
//         {name}
//       </Col>
//       <Col xs={1} className="cell" style={style}>
//         {gender ? 'male' : 'female'}
//       </Col>
//       <Col xs={1} className="cell" style={style}>
//         {birthDate}
//       </Col>
//       <Col xs={2} className="cell" style={style}>
//         {city}
//         &nbsp;
//         {zipcode}
//       </Col>
//       <Col xs={1} className="cell" style={style}>
//         {bankName}
//       </Col>
//       <Col xs={2} className="cell" style={style}>
//         {currency}
//       </Col>
//       <Col xs={1} className="cell text-right" style={style}>
//         {amount}
//       </Col>
//       <Col xs={1} className="cell" style={style}>
//         {card}
//       </Col>
//       <Col className={`${statusColor} cell text-center`} xs={1} style={style}>
//         <Badge variant={statusBadge}>
//           {isActive ? 'active' : 'locked'}
//         </Badge>
//       </Col>
//     </Row>
//   );
// };

const dataToProps = (data) => data.map((item) => {
  const statusColor = item.isActive ? 'active' : 'locked';
  const statusBadge = item.isActive ? 'success' : 'danger';
  const currency = item.currency === 'Codes specifically reserved for'
    + ' testing purposes' ? 'Euro' : item.currency;

  return (
    <RowComponent
      key={item.name}
      id={item.id}
      name={item.name}
      gender={item.gender}
      birthDate={item.birthDate}
      city={item.locationName.city}
      zipcode={item.locationName.zipcode}
      bankName={item.bankName}
      currency={currency}
      amount={item.amount}
      card={item.card}
      statusColor={statusColor}
      statusBadge={statusBadge}
      isActive={item.isActive}
    />
  );
});

const DataSheet = ({
  sort, data, icon1, icon2,
}) => (
  <Container fluid>
    <Row className="header">
      <Col className="fixedColHeader hCell fixedCol" xs={2}>
        Name
      </Col>
      <Col className="hCell" xs={1}>
        Gender
      </Col>
      <Col className="hCell" xs={1}>
        Date of Birth
      </Col>
      <Col className="hCell" xs={2}>
        Address
      </Col>
      <Col className="hCell" xs={1}>
        Bank
      </Col>
      <Col className="hCell" xs={2}>
        Currency
        &nbsp;
        &nbsp;
        <Badge
          className="button"
          variant="secondary"
          onClick={() => sort({ event, field: 'currency' })}
        >
          <FontAwesomeIcon icon={icon1} />
        </Badge>
      </Col>
      <Col className="hCell" xs={1}>
        Balance
        &nbsp;
        &nbsp;
        <Badge
          className="button"
          variant="secondary"
          onClick={() => sort({ event, field: 'amount' })}
        >
          <FontAwesomeIcon icon={icon2} />
        </Badge>
      </Col>
      <Col className="hCell" xs={1}>
        Card
      </Col>
      <Col className="hCell" xs={1}>
        Status
      </Col>
    </Row>
    {dataToProps(data)}
  </Container>
);

function mapStateToProps(state) {
  return {
    sortType: state.sortType,
    data: state.data,
    icon1: state.icon.currency,
    icon2: state.icon.amount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sort: (field) => dispatch(sort(field)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSheet);
