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
// import { sortEnum } from '../../store/actions/datasheet';

// const options = [
//   { value: 'Visa', label: 'Visa' },
//   { value: 'Mastercard', label: 'Mastercard' },
//   { value: 'Maestro', label: 'Maestro' },
// ];

// function sortEnum(value) {
//   console.log(value);
// }

const App = ({ toggleActiveUsers }) => (
  <>
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      style={{ height: 200 }}
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
      <Multiselect
        // defaultValue={options}
        // name="card-select"
        // options={options}
        // onChange={(chosenItems) => sortEnum(chosenItems)}
      />
    </Grid>
    <DataSheet />
  </>
);

const mapStateToProps = (state) => ({
  showActiveUsers: state.showActiveUsers,
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  toggleActiveUsers: (isActive) => dispatch(toggleActiveUsers(isActive)),
  // sortEnum: (chosenItems) => dispatch(sortEnum(chosenItems)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
