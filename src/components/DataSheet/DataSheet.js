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
import { Checkbox } from '@material-ui/core';
import RowComponent from '../RowComponent/RowComponent';

const dataToProps = (data) => data.map((item, idx) => {
  const statusColor = item.isActive ? 'active' : 'locked';
  const statusBadge = item.isActive ? 'success' : 'danger';
  // Fix currency name when faker.js generating name as 'Codes specifically reserved for testing purposes'
  const currency = item.currency === 'Codes specifically reserved for'
    + ' testing purposes' ? 'Euro' : item.currency;
  const id = idx;

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
    clickedField: state.clickedField,
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
