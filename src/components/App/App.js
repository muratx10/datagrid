import React from 'react';
import { connect } from 'react-redux';
import t, { number, string } from 'prop-types';
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
import DeleteIcon from '@material-ui/icons/Delete';
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
  setInvisibleColumn,
} from '../../store/actions/app';
import rowsSelector from '../../store/selectors/selector';
import exportCSV from '../utils/exportCSV';
import faker from 'faker';

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
          Rows:
          {' '}
          {data.length}
        </Badge>
      </h3>
    </Grid>
    <div style={{
      width: '90vw',
      height: '75vh',
      minWidth: '1230px',
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

App.propTypes = {
  toggleActive: t.func.isRequired,
  deleteRows: t.func.isRequired,
  data: t.arrayOf(t.shape({
    id: t.number.isRequired,
    name: t.string.isRequired,
    birthDate: t.string.isRequired,
    companyName: t.string.isRequired,
    amount: t.number.isRequired,
    currency: t.string.isRequired,
    residence: t.bool.isRequired,
    card: t.string.isRequired,
    locationName: t.shape({
      city: t.string.isRequired,
      zipcode: t.string.isRequired,
    }),
    isActive: t.bool.isRequired,
  })).isRequired,
  hideColumn: t.func.isRequired,
  invisibleColumns: t.oneOfType([
    t.arrayOf(string),
    string,
  ]).isRequired,
  setTurboMode: t.func.isRequired,
  showActiveOnly: t.string.isRequired,
  turboMode: t.bool.isRequired,
};

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
