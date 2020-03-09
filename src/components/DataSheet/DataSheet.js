import React from 'react';
import { Table } from 'react-bootstrap';
import { makeStyles, lighten } from '@material-ui/core';
import generateFakeArray from '../../data/fakeDataGenerator';

const fakeData = generateFakeArray(300);

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
});

const dataToProps = (data) => data.map((item, idx) => {
  const classes = useStyle();
  const statusColor = item.isActive ? classes.active : classes.locked;
  return (
    <tr>
      <td>
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
        {item.currency}
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
  return (
    <Table>
      <thead>
        <tr>
          <th className={classes.header}>Name</th>
          <th className={classes.header}>Gender</th>
          <th className={classes.header}>Date of birth</th>
          <th className={classes.header}>Address</th>
          <th className={classes.header}>Bank</th>
          <th className={classes.header}>Currency</th>
          <th className={classes.header}>Balance</th>
          <th className={classes.header}>Status</th>
        </tr>
      </thead>
      <tbody>
        {dataToProps(fakeData)}
      </tbody>
    </Table>
  );
};

export default DataSheet;
