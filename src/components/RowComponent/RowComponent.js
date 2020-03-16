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
import { setActiveRowId, deleteRow } from '../../store/actions/rowcomponent';

const RowComponent = ({
  id, name, gender, birthDate, city, zipcode, bankName, currency, amount, card, statusColor, statusBadge, isActive, setActiveRows, setDeletedRows,
}) => {
  const [activeRow, setActiveRow] = useState(false);
  const style = activeRow ? { backgroundColor: 'lightgray' } : null;
  const chooseRow = (event) => {
    setActiveRow(!activeRow);
    setActiveRows(event.target.id);
  };

  return (
    <Row className="align-items-center row-item" id={id}>
      <Col className="cell fixedCol fixedCol" xs={2} style={style}>
        <Checkbox
          id={id}
          color="primary"
          onChange={chooseRow}
        />
        <IconButton aria-label="delete" onClick={() => setDeletedRows(id)}>
          <DeleteIcon />
        </IconButton>
        <Badge variant="secondary">
          {id}
        </Badge>
        &nbsp;
        {name}
      </Col>
      <Col xs={1} className="cell" style={style}>
        {gender ? 'male' : 'female'}
      </Col>
      <Col xs={1} className="cell" style={style}>
        {birthDate}
      </Col>
      <Col xs={2} className="cell" style={style}>
        {city}
        &nbsp;
        {zipcode}
      </Col>
      <Col xs={1} className="cell" style={style}>
        {bankName}
      </Col>
      <Col xs={2} className="cell" style={style}>
        {currency}
      </Col>
      <Col xs={1} className="cell text-right" style={style}>
        {amount}
      </Col>
      <Col xs={1} className="cell" style={style}>
        {card}
      </Col>
      <Col className={`${statusColor} cell text-center`} xs={1} style={style}>
        <Badge variant={statusBadge}>
          {isActive ? 'active' : 'locked'}
        </Badge>
      </Col>
    </Row>
  );
};


// function mapStateToProps(state) {
//   return {
//     data: state.data,
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    setActiveRows: (id) => dispatch(setActiveRowId(id)),
    setDeletedRows: (id) => dispatch(deleteRow(id)),
  };
}

export default connect(null, mapDispatchToProps)(RowComponent);
