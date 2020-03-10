import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import {
  makeStyles,
  lighten,
} from '@material-ui/core';
import generateFakeArray from '../../data/fakeDataGenerator';

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
  const [sortType, setSortType] = useState('');
  const [fake, setFake] = useState(fakeData);
  const useSort = () => {
    const fakeCopy = [...fake];
    if (sortType === '') {
      setSortType('asc');
      fakeCopy.sort((a, b) => a.amount - b.amount);
      setFake(fakeCopy);
    } else if (sortType === 'asc') {
      setSortType('desc');
      fakeCopy.sort((a, b) => b.amount - a.amount);
      setFake(fakeCopy);
    } else {
      setSortType('');
      setFake(fakeData);
    }
  };
  return (
    <Table hover bordered>
      <thead>
        <tr>
          <th className={`${classes.header} ${classes.fixedColHeader}`}>Name</th>
          <th className={classes.header}>Gender</th>
          <th className={classes.header}>Date of birth</th>
          <th className={classes.header}>Address</th>
          <th className={classes.header}>Bank</th>
          <th className={classes.header}>Currency</th>
          <th className={classes.header}>
            Balance
            <button onClick={() => useSort()}>s</button>
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
