import React from 'react';
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

const dataToProps = (data) => data.map((item, idx) => {
  const statusColor = item.isActive ? 'active' : 'locked';
  const statusBadge = item.isActive ? 'success' : 'danger';
  // Fix currency name when faker.js generating name as 'Codes specifically reserved for testing purposes'
  const currency = item.currency === 'Codes specifically reserved for'
    + ' testing purposes' ? 'Euro' : item.currency;
  const id = idx;
  return (
    <Row className="align-items-center" key={id}>
      <Col className="cell fixedCol fixedCol" xs={2}>
        <Badge variant="secondary">
          {item.id}
        </Badge>
        &nbsp;
        {item.name}
      </Col>
      <Col xs={1} className="cell">
        {item.gender ? 'male' : 'female'}
      </Col>
      <Col xs={1} className="cell">
        {item.birthDate}
      </Col>
      <Col xs={2} className="cell">
        {item.locationName.city}
        &nbsp;
        {item.locationName.zipcode}
      </Col>
      <Col xs={1} className="cell">
        {item.bankName}
      </Col>
      <Col xs={2} className="cell">
        {currency}
      </Col>
      <Col xs={1} className="cell text-right">
        {item.amount}
      </Col>
      <Col xs={1} className="cell">
        {item.card}
      </Col>
      <Col className={`${statusColor} cell text-center`} xs={1}>
        <Badge variant={statusBadge}>
          {item.isActive ? 'active' : 'locked'}
        </Badge>
      </Col>
    </Row>
  );
});

const DataSheet = ({ sort, data, icon1, icon2 }) => {
  return (
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
};

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
