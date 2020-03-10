import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography, Chip, Avatar, Grid, Switch,
} from '@material-ui/core';
import './App.scss';
import DataSheet from '../DataSheet';

const App = () => {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <div>
          <Switch color="primary" />
          <Chip color="default" label="ACTIVE members only" />
        </div>
        <Typography variant="h2">
          Data Grid
        </Typography>
        <Chip
          className="ml-5"
          color="default"
          avatar={<Avatar>!</Avatar>}
          label=" Ctrl + H to show Redux DevTools"
        />
      </Grid>
      <DataSheet />
    </>
  );
};

const mapStateToProps = (state) => ({
  counter: state.counter,
});

const mapDispatchToProps = (dispatch) => ({
  onAdd: () => dispatch({ type: 'ADD' }),
  onSub: () => dispatch({ type: 'SUB' }),
  onRnd: (n) => dispatch({ type: 'RND', payload: n }),
});

App.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
