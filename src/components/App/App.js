import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography, Chip, Avatar, Grid,
} from '@material-ui/core';
import './App.scss';
import TableHeader from '../Header';
import DataSheet from '../DataSheet';

const App = () => (
  <>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
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
