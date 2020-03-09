import React from 'react';
import { Grid, makeStyles, lighten } from '@material-ui/core';

const useStyle = makeStyles({
  container: {
    maxHeight: '100vh',
    position: 'sticky',
    top: 0,
    border: '1px solid red',
    height: 50,
    lineHeight: '47px',
    background: lighten('#000', 0.2),
  },
  item: {
    borderRight: '1px solid white',
    color: '#FFF',
  },
});

const TableHeader = () => {
  const classes = useStyle();
  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={3} align="center" justify="center" className={classes.item}>
        <span>Name, Lastname</span>
      </Grid>
      <Grid item xs={2}>
        <span>Date of birth</span>
      </Grid>
      <Grid item xs={2}>
        <span>Address</span>
      </Grid>
      <Grid item xs={2}>
        <span>Bank</span>
      </Grid>
      <Grid item xs={1}>
        <span>Currency</span>
      </Grid>
      <Grid item xs={1}>
        <span>Balance</span>
      </Grid>
      <Grid item xs={1}>
        <span>Status</span>
      </Grid>
    </Grid>
  );
};

export default TableHeader;
