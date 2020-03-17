import React, { useState } from 'react';
import t from 'prop-types';
import { connect } from 'react-redux';
import {
  Badge,
  Col,
  Row,
} from 'react-bootstrap';
import { Checkbox } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import '../DataSheet/DataSheet.scss';
import './RowComponent.scss';
import { setActiveRowId, deleteRow } from '../../store/actions/rowcomponent';

const RowComponent = ({
  setActiveRows,
  setDeletedRows,
  data,
  index,
  style,
  invisibleColumns,
  key,
}) => {
  const [activeRow, setActiveRow] = useState(false);
  const isActiveStyle = activeRow ? { backgroundColor: 'lightgray' } : null;

  console.log(`key: ${key}`);
  const idx = (data[index].id).toString();
  const chooseRow = () => {
    console.log('eventID', idx);

    setActiveRow(!activeRow);
    setActiveRows(data[index].id);
  };
  const idx = data[index].id.toString();
  const currency = data[index].currency === 'Codes specifically reserved for'
  + ' testing purposes' ? 'Euro' : data[index].currency;
  return (
    <Row
      className="align-items-center row-item"
      id={data[index].id}
      style={style}
      key={key}
    >
      <Col className="cell fixedCol fixedCol" xs={2} style={isActiveStyle}>
        <Checkbox
          id={idx}
          color="primary"
          onChange={chooseRow}
        />
        <IconButton
          aria-label="delete"
          onClick={() => setDeletedRows(data[index].id)}
        >
          <DeleteIcon />
        </IconButton>
        <Badge variant="secondary">
          {data[index].id}
        </Badge>
        &nbsp;
        {data[index].name}
      </Col>
      <Col xs={1} className="cell" style={isActiveStyle}>
        {data[index].gender ? 'male' : 'female'}
      </Col>
      <Col xs={1} className={invisibleColumns.includes('birthDate') ? 'invisible cell' : 'cell'} style={isActiveStyle}>
        {data[index].birthDate}
      </Col>
      <Col xs={2} className="cell" style={isActiveStyle}>
        {data[index].locationName.city}
        &nbsp;
        {data[index].locationName.zipcode}
      </Col>
      <Col xs={1} className={invisibleColumns.includes('bankName') ? 'invisible cell' : 'cell'} style={isActiveStyle}>
        {data[index].bankName}
      </Col>
      <Col xs={2} className="cell" style={isActiveStyle}>
        {currency}
      </Col>
      <Col xs={1} className="cell text-right" style={isActiveStyle}>
        {data[index].amount}
      </Col>
      <Col xs={1} className="cell" style={isActiveStyle}>
        {data[index].card}
      </Col>
      <Col className="cell text-center" xs={1} style={isActiveStyle}>
        <Badge variant={data[index].isActive ? 'success' : 'danger'}>
          {data[index].isActive ? 'active' : 'locked'}
        </Badge>
      </Col>
    </Row>
  );
};


function mapStateToProps(state) {
  return {
    turboMode: state.isTurboModeOn,
    invisibleColumns: state.invisibleColumns,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveRows: (id) => dispatch(setActiveRowId(id)),
    setDeletedRows: (id) => dispatch(deleteRow(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RowComponent);
