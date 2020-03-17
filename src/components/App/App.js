import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography, Chip, Avatar, Grid, Switch,
} from '@material-ui/core';
import './App.scss';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { ExportToCsv } from 'export-to-csv';
import Multiselect from '../Multiselect/Multiselect';
import DataSheet from '../DataSheet';
import { toggleActiveUsers } from '../../store/actions/datasheet';
import SearchField from '../Search';
import { deleteSelectedRows, setInvisibleColumn } from '../../store/actions/app';
// import ColumnMultiselect from '../Multiselect/ColumnMultiselect';

const exportCSV = (obj) => {
  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'My Awesome CSV',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };

  const csvExporter = new ExportToCsv(options);

  csvExporter.generateCsv(obj);
};

const App = ({ toggleActiveUsers, deleteRows, data, hideColumn }) => (
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
      <input type="checkbox" name="birthDate" id="birthDate" onChange={(event) => hideColumn(event.target.id)} />
      <input type="checkbox" name="bankName" id="bankName" onChange={(event) => hideColumn(event.target.id)} />
      {/* <ColumnMultiselect /> */}
      <IconButton aria-label="delete" onClick={deleteRows}>
        <DeleteIcon />
      </IconButton>
      <button onClick={() => exportCSV(data)}>Export</button>
      <Grid item xs={12} sm={6} style={{ margin: '20px 0' }}>
        <SearchField />
      </Grid>
    </Grid>
    <DataSheet style={{ overflowX: 'scroll' }} />
  </>
);

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  toggleActiveUsers: (isActive) => dispatch(toggleActiveUsers(isActive)),
  deleteRows: () => dispatch(deleteSelectedRows()),
  hideColumn: (id) => dispatch(setInvisibleColumn(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
