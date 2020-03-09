import React from 'react';
import { Grid, makeStyles, lighten } from '@material-ui/core';

const useStyle = makeStyles({
  container: {
    maxHeight: '100vh',
    position: 'sticky',
    top: 0,
    height: 50,
    lineHeight: '47px',
    background: lighten('#000', 0.2),
  },
  item: {
    borderRight: '1px solid white',
    color: '#FFF',
    textTransform: 'uppercase',
  },
});

const TableHeader = () => {
  const classes = useStyle();
  return (
    <Grid container spacing={0} className={classes.container}>
      <Grid item xs={3} align="center" className={classes.item}>
        <span>Name, Lastname</span>
      </Grid>
      <Grid item xs={2} align="center" className={classes.item}>
        <span>Date of birth</span>
      </Grid>
      <Grid item xs={2} align="center" className={classes.item}>
        <span>Address</span>
      </Grid>
      <Grid item xs={2} align="center" className={classes.item}>
        <span>Bank</span>
      </Grid>
      <Grid item xs={1} align="center" className={classes.item}>
        <span>Currency</span>
      </Grid>
      <Grid item xs={1} align="center" className={classes.item}>
        <span>Balance</span>
      </Grid>
      <Grid item xs={1} align="center" className={classes.item}>
        <span>Status</span>
      </Grid>
    </Grid>
  );
};

export default TableHeader;
