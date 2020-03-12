import React from 'react';
import {
  Badge,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import {
  makeStyles,
  lighten,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { sort } from '../../store/actions/datasheet';

const useStyle = makeStyles({
  header: {
    position: 'sticky',
    top: 0,
    background: lighten('#000', 0.2),
    color: 'white',
    zIndex: 99,
    height: '40px',
    lineHeight: '40px',
    textTransform: 'uppercase',
  },
  active: {
    color: 'green',
  },
  locked: {
    color: 'red',
  },
  hCell: {
    borderRight: '1px solid gray',
    textAlign: 'center',
  },
  fixedCol: {
    position: 'sticky !important',
    left: 0,
    zIndex: 9,
    background: '#FFF',
  },
  fixedColHeader: {
    position: 'sticky',
    left: 0,
    zIndex: 99,
    background: lighten('#000', 0.2),
  },
  cell: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    height: '40px',
    lineHeight: '40px',
    borderBottom: '1px solid rgba(0, 0, 0, .15)',
  },
});

const dataToProps = (data) => data.map((item, idx) => {
  const cl = useStyle();
  const statusColor = item.isActive ? cl.active : cl.locked;
  const statusBadge = item.isActive ? 'success' : 'danger';
  // Fix currency name when faker.js generating name as 'Codes specifically reserved for testing purposes'
  const currency = item.currency === 'Codes specifically reserved for'
    + ' testing purposes' ? 'Euro' : item.currency;
  const id = idx;
  return (
    <Row className="align-items-center" key={id}>
      <Col className={`${cl.cell} ${cl.fixedCol} fixedCol`} xs={2}>
        <Badge variant="secondary">
          {item.id}
        </Badge>
        &nbsp;
        {item.name}
      </Col>
      <Col xs={1} className={cl.cell}>
        {item.gender ? 'male' : 'female'}
      </Col>
      <Col xs={1} className={cl.cell}>
        {item.birthDate}
      </Col>
      <Col xs={2} className={cl.cell}>
        {item.locationName.city}
        &nbsp;
        {item.locationName.zipcode}
      </Col>
      <Col xs={2} className={cl.cell}>
        {item.bankName}
      </Col>
      <Col xs={2} className={cl.cell}>
        {currency}
      </Col>
      <Col xs={1} className={`${cl.cell} text-right`}>
        {item.amount}
      </Col>
      <Col className={`${statusColor} ${cl.cell} text-center`} xs={1}>
        <Badge variant={statusBadge}>
          {item.isActive ? 'active' : 'locked'}
        </Badge>
      </Col>
    </Row>
  );
});

const DataSheet = ({ sort, data, icon }) => {
  const cl = useStyle();
  // const [sortType, setSortType] = useState({
  //   currency: '',
  //   amount: '',
  // });
  // const [fake, setFake] = useState(fakeData);
  // const [clickedField, setClickedField] = useState([]);
  // const useSort = (event, field) => {
  //   if (event.shiftKey) {
  //     event.preventDefault();
  //     if (clickedField === [] || clickedField === [field]) return; // 1 and 2
  //     if (sortType[field] === '') { // 3
  //       const sortTypeImm = { ...sortType };
  //       sortTypeImm[field] = 'asc';
  //       setSortType(sortTypeImm);
  //       const fakeCopy = _.orderBy(fake, [clickedField[0], field], [sortType[clickedField[0]], 'asc']);
  //       setFake(fakeCopy);
  //     } else if (sortType[field] === 'asc') {
  //       const sortTypeImm = { ...sortType };
  //       sortTypeImm[field] = 'desc';
  //       setSortType(sortTypeImm);
  //       const fakeCopy = _.orderBy(fake, [clickedField[0], field], [sortType[clickedField[0]], 'desc']);
  //       setFake(fakeCopy);
  //     } else {
  //       const sortTypeImm = { ...sortType };
  //       sortTypeImm[field] = '';
  //       setSortType(sortTypeImm);
  //       const fakeCopy = _.orderBy(fakeData, [clickedField[0]], [sortType[clickedField[0]]]);
  //       setFake(fakeCopy);
  //     }
  //     return;
  //   }

  return (
    <Container fluid>
      <Row className={cl.header}>
        <Col className={`${cl.fixedColHeader} ${cl.hCell} fixedCol`} xs={2}>
          Name
        </Col>
        <Col className={cl.hCell} xs={1}>
          Gender
        </Col>
        <Col className={cl.hCell} xs={1}>
          Date of Birth
        </Col>
        <Col className={cl.hCell} xs={2}>
          Address
        </Col>
        <Col className={cl.hCell} xs={2}>
          Bank
        </Col>
        <Col className={cl.hCell} xs={2}>
          Currency
          &nbsp;
          &nbsp;
          <Badge
            className="button"
            variant="secondary"
            onClick={() => sort({ event, field: 'currency' })}
          >
            <FontAwesomeIcon icon={icon.currency} />
          </Badge>
        </Col>
        <Col className={cl.hCell} xs={1}>
          Balance
          &nbsp;
          &nbsp;
          <Badge
            className="button"
            variant="secondary"
            onClick={() => sort({ event, field: 'amount' })}
          >
            <FontAwesomeIcon icon={icon.amount} />
          </Badge>
        </Col>
        <Col className={cl.hCell} xs={1}>
          Status
        </Col>
      </Row>
      {dataToProps(data)}
    </Container>
  );
};

function mapStateToProps(state) {
  return {
    sortType: state.sortType,
    data: state.data,
    clickedField: state.clickedField,
    icon: state.icon,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sort: (field) => dispatch(sort(field)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataSheet);

// export default class DataSheet extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       sortType: {
//         currency: '',
//         amount: '',
//       },
//       fake: fakeData,
//       clickedField: [],
//     };
//   }

//   sort(event, field) {
//     if (event.shiftKey) {
//       event.preventDefault();
//       if (this.state.clickedField === [] || this.state.clickedField === [field]) return; // 1 and 2
//       if (this.state.sortType[field] === '') { // 3
//         const sortTypeImm = { ...this.state.sortType };
//         sortTypeImm[field] = 'asc';
//         this.setState({ sortType: sortTypeImm });
//         const fakeCopy = _.orderBy(this.state.fake, [this.state.clickedField[0], field], [this.state.sortType[this.state.clickedField[0]], 'asc']);
//         this.setState({ fake: fakeCopy });
//       } else if (this.state.sortType[field] === 'asc') {
//         const sortTypeImm = { ...this.state.sortType };
//         sortTypeImm[field] = 'desc';
//         this.setState({ sortType: sortTypeImm });
//         const fakeCopy = _.orderBy(this.state.fake, [this.state.clickedField[0], field], [this.state.sortType[this.state.clickedField[0]], 'desc']);
//         this.setState({ fake: fakeCopy });
//       } else {
//         const sortTypeImm = { ...this.state.sortType };
//         sortTypeImm[field] = '';
//         this.setState({ sortType: sortTypeImm });
//         const fakeCopy = _.orderBy(fakeData, [this.state.clickedField[0]], [this.state.sortType[this.state.clickedField[0]]]);
//         this.setState({ fake: fakeCopy });
//       }
//       return;
//     }
//     // for (let key in sortType) {
//     //   if (key !== field) {
//     //     const sortTypeImm = { ...sortType };
//     //     sortTypeImm[key] = '';
//     //     setSortType(sortTypeImm);
//     //   }
//     // }
//     // console.log(clickedField);
//     // console.log([field]);


//     if (this.state.clickedField[0] !== field) {
//       this.setState({
//         sortType: {
//           currency: '',
//           amount: '',
//         },
//       });
//     }

//     if (this.state.sortType[field] === '') {
//       console.log(this.state.sortType);

//       const sortTypeImm = { ...this.state.sortType };
//       sortTypeImm[field] = 'asc';
//       this.setState({ sortType: sortTypeImm });
//       const fakeCopy = _.orderBy(this.state.fake, [field], ['asc']);
//       this.setState({ fake: fakeCopy });
//       console.log(this.state.sortType);
//     } else if (this.state.sortType[field] === 'asc') {
//       const sortTypeImm = { ...this.state.sortType };
//       sortTypeImm[field] = 'desc';
//       this.setState({ sortType: sortTypeImm });
//       const fakeCopy = _.orderBy(this.state.fake, [field], ['desc']);
//       this.setState({ fake: fakeCopy });
//     } else {
//       const sortTypeImm = { ...this.state.sortType };
//       sortTypeImm[field] = '';
//       this.setState({ sortType: sortTypeImm });
//       this.setState({ fake: fakeData });
//     }
//     this.setState({ clickedField: [field] });
//   }

//   sortIcon(type) {
//     switch (type) {
//       case '': return faSort;
//       case 'asc': return faArrowDown;
//       case 'desc': return faArrowUp;
//       default: return faSort;
//     }
//   }

//   render() {
//     const cl = useStyle();
//     return (
//       <Container fluid>
//         <Row className={cl.header}>
//           <Col className={`${cl.fixedColHeader} ${cl.hCell} fixedCol`} xs={2}>
//             Name
//             <span>
//               <FontAwesomeIcon icon={faArrowUp} />
//             </span>
//           </Col>
//           <Col className={cl.hCell} xs={1}>
//             Gender
//           </Col>
//           <Col className={cl.hCell} xs={1}>
//             Date of Birth
//           </Col>
//           <Col className={cl.hCell} xs={2}>
//             Address
//           </Col>
//           <Col className={cl.hCell} xs={2}>
//             Bank
//           </Col>
//           <Col className={cl.hCell} xs={2}>
//             Currency
//             &nbsp;
//             &nbsp;
//             <Badge
//               className="button"
//               variant="secondary"
//               onClick={(field) => this.sort(event, field = 'currency')}
//             >
//               <FontAwesomeIcon icon={this.sortIcon(this.state.sortType.currency)} />
//             </Badge>
//           </Col>
//           <Col className={cl.hCell} xs={1}>
//             Balance
//             &nbsp;
//             &nbsp;
//             <Badge
//               className="button"
//               variant="secondary"
//               onClick={(field) => this.sort(event, field = 'amount')}
//             >
//               <FontAwesomeIcon icon={this.sortIcon(this.state.sortType.amount)} />
//             </Badge>
//           </Col>
//           <Col className={cl.hCell} xs={1}>
//             Status
//           </Col>
//         </Row>
//         {dataToProps(this.state.fake)}
//       </Container>
//     );
//   }
// }
