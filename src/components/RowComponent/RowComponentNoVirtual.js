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

const RowComponentNoVirtual = ({
  id,
  name,
  gender,
  birthDate,
  city,
  zipcode,
  bankName,
  currency,
  amount,
  card,
  isActive,
  setActiveRows,
  setDeletedRows,
  invisibleColumns,
}) => {
  const [activeRow, setActiveRow] = useState(false);
  const isActiveStyle = activeRow ? { backgroundColor: 'lightgray' } : null;
  const chooseRow = () => {
    setActiveRow(!activeRow);
    setActiveRows(id);
  };
  const idx = id.toString();
  return (
    <Row
      className="align-items-center row-item"
      id={id}
    >
      <Col className="cell fixedCol fixedCol" xs={2} style={isActiveStyle}>
        <Checkbox
          id={idx}
          color="primary"
          onChange={chooseRow}
        />
        <IconButton
          aria-label="delete"
          onClick={() => setDeletedRows(id)}
        >
          <DeleteIcon />
        </IconButton>
        <Badge variant="secondary">
          {id}
        </Badge>
        &nbsp;
        {name}
      </Col>
      <Col xs={1} className="cell" style={isActiveStyle}>
        {gender ? 'male' : 'female'}
      </Col>
      <Col xs={1} className={invisibleColumns.includes('birthDate') ? 'invisible cell' : 'cell'} style={isActiveStyle}>
        {birthDate}
      </Col>
      <Col xs={2} className="cell" style={isActiveStyle}>
        {city}
        &nbsp;
        {zipcode}
      </Col>
      <Col xs={1} className={invisibleColumns.includes('bankName') ? 'invisible cell' : 'cell'} style={isActiveStyle}>
        {bankName}
      </Col>
      <Col xs={2} className="cell" style={isActiveStyle}>
        {currency}
      </Col>
      <Col xs={1} className="cell text-right" style={isActiveStyle}>
        {amount}
      </Col>
      <Col xs={1} className="cell" style={isActiveStyle}>
        {card}
      </Col>
      <Col className="cell text-center" xs={1} style={isActiveStyle}>
        <Badge variant={isActive ? 'success' : 'danger'}>
          {isActive ? 'active' : 'locked'}
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

export default connect(mapStateToProps, mapDispatchToProps)(RowComponentNoVirtual);
