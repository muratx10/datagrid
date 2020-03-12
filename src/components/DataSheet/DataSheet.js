import React from 'react';
import {
  Badge,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import {
  makeStyles,
  lighten,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { sort } from '../../store/actions/datasheet';

const stylify = makeStyles({
  header: {
    position: 'sticky',
    top: 0,
    background: lighten('#000', 0.2),
    color: 'white',
    zIndex: 99,
    height: '40px',
    lineHeight: '40px',
    textTransform: 'uppercase',
  },
  active: {
    color: 'green',
  },
  locked: {
    color: 'red',
  },
  hCell: {
    borderRight: '1px solid gray',
    textAlign: 'center',
  },
  fixedCol: {
    position: 'sticky !important',
    left: 0,
    zIndex: 9,
    background: '#FFF',
  },
  fixedColHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 99,
    background: lighten('#000', 0.2),
  },
  cell: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    height: '40px',
    lineHeight: '40px',
    borderBottom: '1px solid rgba(0, 0, 0, .15)',
  },
});

const dataToProps = (data) => data.map((item, idx) => {
  const cl = stylify();
  const statusColor = item.isActive ? cl.active : cl.locked;
  const statusBadge = item.isActive ? 'success' : 'danger';
  // Fix currency name when faker.js generating name as 'Codes specifically reserved for testing purposes'
  const currency = item.currency === 'Codes specifically reserved for'
    + ' testing purposes' ? 'Euro' : item.currency;
  const id = idx;
  return (
    <Row className="align-items-center" key={id}>
      <Col className={`${cl.cell} ${cl.fixedCol} fixedCol`} xs={2}>
        <Badge variant="secondary">
          {item.id}
        </Badge>
        &nbsp;
        {item.name}
      </Col>
      <Col xs={1} className={cl.cell}>
        {item.gender ? 'male' : 'female'}
      </Col>
      <Col xs={1} className={cl.cell}>
        {item.birthDate}
      </Col>
      <Col xs={2} className={cl.cell}>
        {item.locationName.city}
        &nbsp;
        {item.locationName.zipcode}
      </Col>
      <Col xs={1} className={cl.cell}>
        {item.bankName}
      </Col>
      <Col xs={2} className={cl.cell}>
        {currency}
      </Col>
      <Col xs={1} className={`${cl.cell} text-right`}>
        {item.amount}
      </Col>
      <Col xs={1} className={cl.cell}>
        {item.card}
      </Col>
      <Col className={`${statusColor} ${cl.cell} text-center`} xs={1}>
        <Badge variant={statusBadge}>
          {item.isActive ? 'active' : 'locked'}
        </Badge>
      </Col>
    </Row>
  );
});

const DataSheet = ({ sort, data, icon1, icon2 }) => {
  const cl = stylify();
  // console.log(data);

  return (
    <Container fluid>
      <Row className={cl.header}>
        <Col className={`${cl.fixedColHeader} ${cl.hCell} fixedCol`} xs={2}>
          Name
        </Col>
        <Col className={cl.hCell} xs={1}>
          Gender
        </Col>
        <Col className={cl.hCell} xs={1}>
          Date of Birth
        </Col>
        <Col className={cl.hCell} xs={2}>
          Address
        </Col>
        <Col className={cl.hCell} xs={1}>
          Bank
        </Col>
        <Col className={cl.hCell} xs={2}>
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
        <Col className={cl.hCell} xs={1}>
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
        <Col className={cl.hCell} xs={1}>
          Card
        </Col>
        <Col className={cl.hCell} xs={1}>
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
