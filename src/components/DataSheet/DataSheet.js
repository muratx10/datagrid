import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import {
  makeStyles,
  lighten,
} from '@material-ui/core';
import generateFakeArray from '../../data/fakeDataGenerator';

const _ = require('lodash');

const fakeData = generateFakeArray(1000);

const useStyle = makeStyles({
  header: {
    position: 'sticky',
    top: 0,
    background: lighten('#000', 0.2),
    color: 'white',
    borderRight: '1px solid gray',
  },
  active: {
    color: 'green',
  },
  locked: {
    color: 'red',
  },
  fixedCol: {
    position: 'sticky',
    left: 0,
    overflow: 'hidden',
    borderCollapse: 'separate',
    zIndex: 9,
    background: '#FFF',
  },
  fixedColHeader: {
    position: 'sticky',
    left: 0,
    overflow: 'hidden',
    borderCollapse: 'separate',
    zIndex: 10,
  },
});

const dataToProps = (data) => data.map((item, idx) => {
  const classes = useStyle();
  const statusColor = item.isActive ? classes.active : classes.locked;
  // Fix currency name when faker.js generating name as 'Codes specifically reserved for testing purposes'
  const currency = item.currency === 'Codes specifically reserved for'
    + ' testing purposes' ? 'Euro' : item.currency;
  return (
    <tr>
      <td className={classes.fixedCol}>
        {item.name}
      </td>
      <td>
        {item.gender ? 'male' : 'female'}
      </td>
      <td>
        {item.birthDate}
      </td>
      <td>
        {item.locationName.city}
        &nbsp;
        {item.locationName.zipcode}
      </td>
      <td>
        {item.bankName}
      </td>
      <td>
        {currency}
      </td>
      <td>
        {item.amount}
      </td>
      <td className={statusColor}>
        {item.isActive ? 'active' : 'locked'}
      </td>
    </tr>
  );
});

const DataSheet = () => {
  const classes = useStyle();
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

  return (
    <Table hover bordered>
      <thead>
        <tr>
          <th className={`${classes.header} ${classes.fixedColHeader}`}>
            Name
            {/* <button onClick={() => useNameSort(event)}>s</button> */}
          </th>
          <th className={classes.header}>Gender</th>
          <th className={classes.header}>Date of birth</th>
          <th className={classes.header}>Address</th>
          <th className={classes.header}>Bank</th>
          <th className={classes.header}>
            Currency
            <button onClick={(field) => useSort(event, field = 'currency')}>s</button>
          </th>
          <th className={classes.header}>
            Balance
            <button onClick={(field) => useSort(event, field = 'amount')}>s</button>
          </th>
          <th className={classes.header}>Status</th>
        </tr>
      </thead>
      <tbody>
        {dataToProps(fake)}
      </tbody>
    </Table>
  );
};

export default DataSheet;
