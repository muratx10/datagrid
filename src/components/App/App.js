import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography, Chip, Avatar, Grid, Switch,
} from '@material-ui/core';
import './App.scss';
import Multiselect from '../Multiselect/Multiselect';
import DataSheet from '../DataSheet';
import { toggleActiveUsers } from '../../store/actions/datasheet';

const App = ({ toggleActiveUsers }) => (
  <>
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      style={{ height: 100 }}
    >
      <div>
        <Switch color="primary" onChange={(e) => toggleActiveUsers(e.target.checked)} />
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
      <Multiselect />
    </Grid>
    <DataSheet />
  </>
);

const mapDispatchToProps = (dispatch) => ({
  toggleActiveUsers: (isActive) => dispatch(toggleActiveUsers(isActive)),
});


export default connect(null, mapDispatchToProps)(App);
