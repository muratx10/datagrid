import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography, Chip, Avatar, Grid, Switch, Checkbox, FormControlLabel,
} from '@material-ui/core';
import './App.scss';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { ExportToCsv } from 'export-to-csv';
import Multiselect from '../Multiselect/MultiSelect';
import DataSheet from '../DataSheet';
import {
  setTurboMode,
  toggleActiveUsers,
} from '../../store/actions/datasheet';
import SearchField from '../Search';
import { deleteSelectedRows, setInvisibleColumn } from '../../store/actions/app';

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

const App = ({
  toggleActive, deleteRows, data, hideColumn, invisibleColumns, setTurboMode, showActiveOnly
}) => (
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
            <Switch
              color="primary"
              onChange={toggleActive}
              checked={showActiveOnly === 'yes'}
            />
            <Chip color="default" label="ACTIVE members only" />
          </div>
          <div>
            <Switch
              color="primary"
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
      <FormControlLabel
        control={(
          <Checkbox
            id="birthDate"
            color="primary"
            checked={!!invisibleColumns.includes('birthDate')}
            onChange={(event) => hideColumn(event.target.id)}
          />
      )}
        label="Hide Birth Date"
      />
      <FormControlLabel
        control={(
          <Checkbox
            id="bankName"
            color="primary"
            checked={!!invisibleColumns.includes('bankName')}
            onChange={(event) => hideColumn(event.target.id)}
          />
      )}
        label="Hide Bank"
      />
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
  invisibleColumns: state.invisibleColumns,
  showActiveOnly: state.showActiveOnly,
});

const mapDispatchToProps = (dispatch) => ({
  toggleActive: () => dispatch(toggleActiveUsers()),
  setTurboMode: (isTurboModeOn) => dispatch(setTurboMode(isTurboModeOn)),
  deleteRows: () => dispatch(deleteSelectedRows()),
  hideColumn: (id) => dispatch(setInvisibleColumn(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
