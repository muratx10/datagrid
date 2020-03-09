import React from 'react';
import { Grid, lighten, makeStyles } from '@material-ui/core';
import generateFakeArray from '../../data/fakeDataGenerator';


const fakeData = generateFakeArray(300);

const useStyle = makeStyles({
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
  item: {
    textOverflow: 'ellipsis',
  },
  hr: {
    height: '1%',
    width: '100%',
    background: lighten('#000', 0.99),
  },
});

const dataToProps = (data) => data.map((item, index) => {
  const classes = useStyle();
  const statusColor = item.isActive ? [classes.active] : [classes.locked];
  // Fix currencyName when it's value generated as Codes specifically
  // reserved for testing by faker.js
  const currency = item.currency === 'Codes specifically reserved for testing purposes' ? 'Euro' : item.currency;
  return (
    <>
      <Grid container key={index} alignItems="center" className={classes.container}>
        <Grid item xs={3}>
          <span>{item.name}</span>
        </Grid>
        <Grid item xs={2}>
          <span>{item.birthDate}</span>
        </Grid>
        <Grid item xs={2}>
        <span>
          {item.locationName.city}
          &nbsp;
          {item.locationName.zipcode}
        </span>
        </Grid>
        <Grid item xs={2}>
          <span>{item.bankName}</span>
        </Grid>
        <Grid item xs={1}>
          <span>{currency}</span>
        </Grid>
        <Grid item xs={1}>
          <span>{item.amount}</span>
        </Grid>
        <Grid item xs={1}>
          <span
            className={statusColor}
          >
            {item.isActive ? 'active' : 'locked'}
          </span>
        </Grid>
      </Grid>
      <hr className={classes.hr} />
    </>
  );
});

const DataSheet = () => {
  return (
    <Grid container>
      {dataToProps(fakeData)}
    </Grid>
  );
};

export default DataSheet;
