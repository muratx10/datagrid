import React, { useState } from 'react';
import {
  Badge,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import {
  makeStyles,
  lighten,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';

import generateFakeArray from '../../data/fakeDataGenerator';

const _ = require('lodash');

const fakeData = generateFakeArray(1000);

const useStyle = makeStyles({
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
  const cl = useStyle();
  const statusColor = item.isActive ? cl.active : cl.locked;
  const statusBadge = item.isActive ? 'success' : 'danger';
  // Fix currency name when faker.js generating name as 'Codes specifically reserved for testing purposes'
  const currency = item.currency === 'Codes specifically reserved for'
    + ' testing purposes' ? 'Euro' : item.currency;
  return (
    <Row className="align-items-center">
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
      <Col xs={2} className={cl.cell}>
        {item.bankName}
      </Col>
      <Col xs={2} className={cl.cell}>
        {currency}
      </Col>
      <Col xs={1} className={`${cl.cell} text-right`}>
        {item.amount}
      </Col>
      <Col className={`${statusColor} ${cl.cell} text-center`} xs={1}>
        <Badge variant={statusBadge}>
          {item.isActive ? 'active' : 'locked'}
        </Badge>
      </Col>
    </Row>
  );
});

const DataSheet = () => {
  const cl = useStyle();
  const [sortType, setSortType] = useState({
    currency: '',
    amount: '',
  });
  const [fake, setFake] = useState(fakeData);
  const [clickedField, setClickedField] = useState([]);
  const useSort = (event, field) => {
    if (event.shiftKey) {
      if (clickedField === [] || clickedField === [field]) return; // 1 and 2
      if (sortType[field] === '') { // 3
        const sortTypeImm = { ...sortType };
        sortTypeImm[field] = 'asc';
        setSortType(sortTypeImm);
        const fakeCopy = _.orderBy(fake, [clickedField[0], field], [sortType[clickedField[0]], 'asc']);
        setFake(fakeCopy);
      } else if (sortType[field] === 'asc') {
        const sortTypeImm = { ...sortType };
        sortTypeImm[field] = 'desc';
        setSortType(sortTypeImm);
        const fakeCopy = _.orderBy(fake, [clickedField[0], field], [sortType[clickedField[0]], 'desc']);
        console.log(fake);
        setFake(fakeCopy);
      } else {
        const sortTypeImm = { ...sortType };
        sortTypeImm[field] = '';
        setSortType(sortTypeImm);
        const fakeCopy = _.orderBy(fakeData, [clickedField[0]], [sortType[clickedField[0]]]);
        setFake(fakeCopy);
      }
      return;
    }

    if (sortType[field] === '') {
      const sortTypeImm = { ...sortType };
      sortTypeImm[field] = 'asc';
      setSortType(sortTypeImm);
      const fakeCopy = _.orderBy(fake, [field], ['asc']);
      setFake(fakeCopy);
    } else if (sortType[field] === 'asc') {
      const sortTypeImm = { ...sortType };
      sortTypeImm[field] = 'desc';
      setSortType(sortTypeImm);
      const fakeCopy = _.orderBy(fake, [field], ['desc']);
      setFake(fakeCopy);
    } else {
      const sortTypeImm = { ...sortType };
      sortTypeImm[field] = '';
      setSortType(sortTypeImm);
      setFake(fakeData);
    }
    setClickedField([field]);
  };

  const sortIcon = (type) => {
    switch (type) {
      case '': return faSort;
      case 'asc': return faArrowDown;
      case 'desc': return faArrowUp;
      default: return faSort;
    }
  };

  return (
    <Container fluid>
      <Row className={cl.header}>
        <Col className={`${cl.fixedColHeader} ${cl.hCell} fixedCol`} xs={2}>
          Name
          <span>
            <FontAwesomeIcon icon={faArrowUp} />
          </span>
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
        <Col className={cl.hCell} xs={2}>
          Bank
        </Col>
        <Col className={cl.hCell} xs={2}>
          Currency
          &nbsp;
          &nbsp;
          <Badge
            className="button"
            variant="secondary"
            onClick={(field) => useSort(event, field = 'currency')}
          >
            <FontAwesomeIcon icon={sortIcon(sortType.currency)} />
          </Badge>
        </Col>
        <Col className={cl.hCell} xs={1}>
          Balance
          &nbsp;
          &nbsp;
          <Badge
            className="button"
            variant="secondary"
            onClick={(field) => useSort(event, field = 'amount')}
          >
            <FontAwesomeIcon icon={sortIcon(sortType.amount)} />
          </Badge>
        </Col>
        <Col className={cl.hCell} xs={1}>
          Status
        </Col>
      </Row>
      {dataToProps(fake)}
    </Container>
  );
};

export default DataSheet;
