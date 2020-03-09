import React from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableContainer,
  TableHead,
  makeStyles,
} from '@material-ui/core';
import generateFakeArray from '../../data/fakeDataGenerator';

const fakeData = generateFakeArray(50);
const useStyle = makeStyles({
  container: {
    maxHeight: '100vh',
    boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.5)',
  },
  headCell: {
    background: '#252525',
    color: 'white',
  },
  active: {
    color: 'green',
  },
  locked: {
    color: 'red',
  },
  name: {
    width: '20px',
  },
});

const dataToProps = (data) => data.map((item, idx) => {
  const classes = useStyle();
  const statusColor = item.isActive ? [classes.active] : [classes.locked];
  return (
    <TableRow key={idx} hover>
      <TableCell>
        {item.name}
      </TableCell>
      <TableCell>
        {item.birthDate}
      </TableCell>
      <TableCell>
        {item.bankName}
      </TableCell>
      <TableCell>
        {item.currency}
      </TableCell>
      <TableCell align="right">
        {item.amount}
      </TableCell>
      <TableCell>
        {item.locationName.city}
        {item.locationName.zipcode}
      </TableCell>
      <TableCell className={statusColor}>
        {item.isActive ? 'active' : 'locked'}
      </TableCell>
    </TableRow>
  );
});


const TableRoot = () => {
  const classes = useStyle();
  return (
    <TableContainer className={classes.container}>
      <Table
        stickyHeader
        aria-label="sticky table"
      >
        <TableHead>
          <TableRow>
            <TableCell className={`${classes.headCell} ${classes.name}`}>
              Name, Last Name
            </TableCell>
            <TableCell className={classes.headCell}>
              Birth date
            </TableCell>
            <TableCell className={classes.headCell}>
              Bank Name
            </TableCell>
            <TableCell className={classes.headCell}>
              Currency
            </TableCell>
            <TableCell className={classes.headCell}>
              Amount
            </TableCell>
            <TableCell className={classes.headCell}>
              Address
            </TableCell>
            <TableCell className={classes.headCell}>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataToProps(fakeData)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableRoot;
