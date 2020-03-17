import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography, Chip, Avatar, Grid, Switch,
} from '@material-ui/core';
import './App.scss';
import Multiselect from '../Multiselect/Multiselect';
import DataSheet from '../DataSheet';
import {
  setTurboMode,
  toggleActiveUsers,
} from '../../store/actions/datasheet';
import SearchField from '../Search';

const App = ({ toggleActiveUsers, setTurboMode }) => (
  <>
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      style={{
        padding: '10px',
        display: 'flex',
        overflow: 'auto',
      }}
    >
      <div>
        <Grid
          container
          direction="column"
        >
          <div>
            <Switch color="primary"
                    onChange={(e) => toggleActiveUsers(e.target.checked)} />
            <Chip color="default" label="ACTIVE members only" />
          </div>
          <div>
            <Switch color="primary"
                    onChange={(e) => setTurboMode(e.target.checked)}
            />
            <Chip color="default" label="TURBO mode ON" />
          </div>
        </Grid>
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
      <Grid item xs={12} sm={6} style={{ margin: '20px 0' }}>
        <SearchField />
      </Grid>
    </Grid>
    <DataSheet style={{ overflowX: 'scroll' }} />
  </>
);


const mapDispatchToProps = (dispatch) => ({
  toggleActiveUsers: (isActive) => dispatch(toggleActiveUsers(isActive)),
  setTurboMode: (isTurboModeOn) => dispatch(setTurboMode(isTurboModeOn)),
});


export default connect(null, mapDispatchToProps)(App);
