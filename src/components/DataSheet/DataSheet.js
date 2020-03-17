import React from 'react';
import { FixedSizeList as List } from 'react-window';
import _ from 'lodash';
import {
  Badge,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { sort } from '../../store/actions/datasheet';
import './DataSheet.scss';
import RowComponent from '../RowComponent/RowComponent';
import rowsSelector from '../../store/selectors/selector';

// const dataToProps = (data) => data.map((item, idx) => {
//   const statusColor = item.isActive ? 'active' : 'locked';
//   const statusBadge = item.isActive ? 'success' : 'danger';
//   // Fix currency name when faker.js generating name as 'Codes specifically reserved for testing purposes'
//   const currency = item.currency === 'Codes specifically reserved for'
//   + ' testing purposes' ? 'Euro' : item.currency;
//
//   return (
//     <RowComponent
//       key={item.id}
//       id={item.id}
//       name={item.name}
//       gender={item.gender}
//       birthDate={item.birthDate}
//       city={item.locationName.city}
//       zipcode={item.locationName.zipcode}
//       bankName={item.bankName}
//       currency={currency}
//       amount={item.amount}
//       card={item.card}
//       statusColor={statusColor}
//       statusBadge={statusBadge}
//       isActive={item.isActive}
//     />
//   );
// });

const DataSheet = ({
  sorting, data, icon1, icon2, invisibleColumns,
}) => (
  <Container fluid>
    <Row className="header">
      <Col className="fixedColHeader hCell fixedCol" xs={2}>
        Name
      </Col>
      <Col className="hCell" xs={1}>
        Gender
      </Col>
      <Col className={invisibleColumns.includes('birthDate') ? 'invisible hCell' : 'hCell'} xs={1}>
        Date of Birth
      </Col>
      <Col className="hCell" xs={2}>
        Address
      </Col>
      <Col className={invisibleColumns.includes('bankName') ? 'invisible hCell' : 'hCell'} xs={1}>
        Bank
      </Col>
      <Col className="hCell" xs={2}>
        Currency
        &nbsp;
        &nbsp;
        <Badge
          className="button"
          variant="secondary"
          onClick={() => sorting({ event, field: 'currency' })}
        >
          <FontAwesomeIcon icon={icon1} />
        </Badge>
      </Col>
      <Col className="hCell" xs={1}>
        Balance
        &nbsp;
        &nbsp;
        <Badge
          className="button"
          variant="secondary"
          onClick={() => sorting({ event, field: 'amount' })}
        >
          <FontAwesomeIcon icon={icon2} />
        </Badge>
      </Col>
      <Col className="hCell" xs={1}>
        Card
      </Col>
      <Col className="hCell" xs={1}>
        Status
      </Col>
    </Row>
    <List
      height={Math.max(document.documentElement.clientHeight, window.innerHeight || 0)}
      width={1700}
      itemSize={40}
      itemCount={data.length}
      itemData={data}
      itemKey={_.uniqueId}
    >
      {RowComponent}
    </List>
  </Container>
);


function mapStateToProps(state) {
  return {
    sortType: state.sortType,
    data: rowsSelector(state),
    clickedField: state.clickedField,
    icon1: state.icon.currency,
    icon2: state.icon.amount,
    invisibleColumns: state.invisibleColumns,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sorting: (field) => dispatch(sort(field)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSheet);
