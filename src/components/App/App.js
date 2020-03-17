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
import MultiSelect from '../MultiSelect/MultiSelect';
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
  toggleActive,
  deleteRows,
  data,
  hideColumn,
  invisibleColumns,
  setTurboMode,
  showActiveOnly,
  turboMode,
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
              checked={!!turboMode}
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
      <MultiSelect />
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
    <div style={{
      width: '90vw',
      height: '75vh',
      overflow: 'scroll',
      margin: '0 auto',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    }}
    >
      <DataSheet style={{ overflowX: 'scroll' }} />
    </div>
  </>
);

const mapStateToProps = (state) => ({
  data: state.data,
  invisibleColumns: state.invisibleColumns,
  showActiveOnly: state.showActiveOnly,
  turboMode: state.isTurboModeOn,
});

const mapDispatchToProps = (dispatch) => ({
  toggleActive: () => dispatch(toggleActiveUsers()),
  setTurboMode: (isTurboModeOn) => dispatch(setTurboMode(isTurboModeOn)),
  deleteRows: () => dispatch(deleteSelectedRows()),
  hideColumn: (id) => dispatch(setInvisibleColumn(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
