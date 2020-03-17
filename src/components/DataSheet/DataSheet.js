import React from 'react';
import { FixedSizeList as List } from 'react-window';
import {
  Badge,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import {
  faArrowDown,
  faArrowUp,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { sort } from '../../store/actions/datasheet';
import './DataSheet.scss';
import RowComponent from '../RowComponent/RowComponent';
import rowsSelector from '../../store/selectors/selector';
import RowComponentNoVirtual from '../RowComponent/RowComponentNoVirtual';

const dataToProps = (data) => data.map((item, idx) => {
  const currency = item.currency === 'Codes specifically reserved for'
  + ' testing purposes' ? 'Euro' : item.currency;

  return (
    <RowComponentNoVirtual
      key={item.id}
      id={item.id}
      name={item.name}
      residence={item.residence}
      birthDate={item.birthDate}
      city={item.locationName.city}
      zipcode={item.locationName.zipcode}
      companyName={item.companyName}
      currency={currency}
      amount={item.amount}
      card={item.card}
      isActive={item.isActive}
    />
  );
});

const DataSheet = ({
  sorting, data, icon1, icon2, invisibleColumns, turboMode, sort1, sort2
}) => {
  const iconGen = (field) => {
    if (sort1[0] === field) {
      switch (sort1[1]) {
        case 'asc':
          return faArrowDown;
        case 'desc':
          return faArrowUp;
        default:
          return faSort;
      }
    } else if (sort2[0] === field) {
      switch (sort2[1]) {
        case 'asc':
          return faArrowDown;
        case 'desc':
          return faArrowUp;
        default:
          return faSort;
      }
    } else {
      return faSort;
    }
  };
  return (
    <Container fluid>
      <Row className="header">
        <Col className="fixedColHeader hCell fixedCol" xs={2}>
          Name
        </Col>
        <Col className="hCell" xs={1}>
          Residence
        </Col>
        <Col
          className={invisibleColumns.includes('birthDate') ? 'invisible hCell' : 'hCell'}
          xs={1}
        >
          Date of Birth
        </Col>
        <Col className="hCell" xs={2}>
          Address
        </Col>
        <Col
          className={invisibleColumns.includes('companyName') ? 'invisible'
            + ' hCell' : 'hCell'}
          xs={1}>
          Company
        </Col>
        <Col className="hCell" xs={2}>
          Currency
          &nbsp;
          &nbsp;
          <Badge
            className="button"
            variant="secondary"

            onClick={(event) => sorting({
              event,
              field: 'currency',
            })}
          >
            <FontAwesomeIcon icon={iconGen('currency')} />
          </Badge>
        </Col>
        <Col className="hCell" xs={1}>
          Balance
          &nbsp;
          &nbsp;
          <Badge
            className="button"
            variant="secondary"

            onClick={(event) => sorting({
              event,
              field: 'amount',
            })}
          >
            <FontAwesomeIcon icon={iconGen('amount')} />
          </Badge>
        </Col>
        <Col className="hCell" xs={1}>
          Card
        </Col>
        <Col className="hCell" xs={1}>
          Status
        </Col>
      </Row>
      {
        turboMode ? (
            <List
              height={Math.max(document.documentElement.clientHeight, window.innerHeight || 0)}
              width={1900}
              itemSize={40}
              itemCount={data.length}
              itemData={data}
              itemKey={_.uniqueId}
            >
              {RowComponent}
            </List>
        )
          : dataToProps(data)
      }
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    sortType: state.sortType,
    data: rowsSelector(state),
    clickedField: state.clickedField,
    icon1: state.icon.currency,
    icon2: state.icon.amount,
    icon3: state.icon.name,
    invisibleColumns: state.invisibleColumns,
    turboMode: state.isTurboModeOn,
    sort1: state.sort1,
    sort2: state.sort2,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sorting: (obj) => dispatch(sort(obj)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSheet);
