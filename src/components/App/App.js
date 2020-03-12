import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography, Chip, Avatar, Grid, Switch,
} from '@material-ui/core';
import './App.scss';
import DataSheet from '../DataSheet';
import { toggleActiveUsers } from '../../store/actions/datasheet';

const App = ({ toggleActiveUsers }) => {
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <div>
          {/* <Switch color="primary" onChange={(e) => toggleActiveUsers(e.target.checked)} /> */}
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
  showActiveUsers: state.showActiveUsers,
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  toggleActiveUsers: (isActive) => dispatch(toggleActiveUsers(isActive)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
