import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Typography,
  Chip,
  Grid,
  Switch,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Button,
} from '@material-ui/core';
import './App.scss';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { ExportToCsv } from 'export-to-csv';
import Badge from 'react-bootstrap/Badge';
import MultiSelect from '../MultiSelect/MultiSelect';
import DataSheet from '../DataSheet';
import {
  setTurboMode,
  toggleActiveUsers,
} from '../../store/actions/datasheet';
import SearchField from '../Search';
import {
  deleteSelectedRows,
  setInvisibleColumn
} from '../../store/actions/app';
import rowsSelector from '../../store/selectors/selector';

ExportToCsv.prototype._formatData = function (data) {
  if (this._options.decimalSeparator === 'locale' && this._isFloat(data)) {
    return data.toLocaleString();
  }
  if (this._options.decimalSeparator !== '.' && this._isFloat(data)) {
    return data.toString().replace('.', this._options.decimalSeparator);
  }
  if (typeof data === 'string') {
    data = data.replace(/"/g, '""');
    if (this._options.quoteStrings || data.indexOf(',') > -1 || data.indexOf('\n') > -1 || data.indexOf('\r') > -1) {
      data = this._options.quoteStrings + data + this._options.quoteStrings;
    }
    return data;
  }
  if (typeof data === 'boolean') {
    return data ? 'TRUE' : 'FALSE';
  }
  return data;
};

const exportCSV = (obj, invisibleColumns) => {
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
  let newData = [...obj];
  if (invisibleColumns.length !== 0) { // only for exportCSV
    newData = newData.map((row) => {
      const clone = { ...row };
      invisibleColumns.forEach((item) => { delete clone[item]; });
      return clone;
    });
  }
  csvExporter.generateCsv(newData);
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
            <Chip color="default" label="Data Virtualization mode" />
          </div>
        </Grid>
      </div>
      <Tooltip title="CTRL+H to show Redux DevTools">
        <Typography variant="h2" style={{ cursor: 'help' }}>
          Data Grid
        </Typography>
      </Tooltip>
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
            id="companyName"
            color="primary"
            checked={!!invisibleColumns.includes('companyName')}
            onChange={(event) => hideColumn(event.target.id)}
          />
        )}
        label="Hide Company"
      />
      <Button
        onClick={deleteRows}
        variant="contained"
        color="primary"
      >
        <DeleteIcon />
        Remove selected rows &nbsp;&nbsp;
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => exportCSV(data, invisibleColumns)}
      >
        Export to CSV
      </Button>
      <Grid
        container
        direction="row"
        item
        spacing={2}
        xs={12}
        sm={6}
        style={{ margin: '20px 0' }}
      >
        <Grid item xs={8}>
          <SearchField />
        </Grid>
        <Grid item xs={4}>
          <MultiSelect />
        </Grid>
      </Grid>
      <h3 style={{
        position: 'absolute',
        top: '150px',
        minWidth: '980px',
        zIndex: 9999,
        width: '90vw',
      }}
      >
        <Badge
          variant="primary"
          className="countBadge"
        >
          Rows: {data.length}
        </Badge>
      </h3>
    </Grid>
    <div style={{
      width: '90vw',
      height: '75vh',
      minWidth: '980px',
      overflow: 'scroll',
      margin: '0 auto',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      position: 'relative',
    }}
    >
      <DataSheet style={{ overflowX: 'scroll' }} />
    </div>
  </>
);

const mapStateToProps = (state) => ({
  data: rowsSelector(state),
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
