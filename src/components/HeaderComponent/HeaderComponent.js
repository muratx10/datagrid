// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import {
//   Badge,
//   Col,
//   Row,
// } from 'react-bootstrap';

// const headerArr = [
//   'Name', 'Gender', 'Date of Birth',
// ]

// const HeaderComponent = () => {

//   const style = {display: 'none'};
//   // style={hiddenColumns.includes('Gender') ? style : null }
//   return (
//     <Row className="header">
//       <Col className="fixedColHeader hCell fixedCol" xs={2}>
//         Name
//       </Col>
//       <Col className="hCell" xs={1}>
//         Gender
//       </Col>
//       <Col className="hCell" xs={1}>
//         Date of Birth
//       </Col>
//       <Col className="hCell" xs={2}>
//         Address
//       </Col>
//       <Col className="hCell" xs={1}>
//         Bank
//       </Col>
//       <Col className="hCell" xs={2}>
//         Currency
//         &nbsp;
//         &nbsp;
//         <Badge
//           className="button"
//           variant="secondary"
//           onClick={() => sorting({ event, field: 'currency' })}
//         >
//           <FontAwesomeIcon icon={icon1} />
//         </Badge>
//       </Col>
//       <Col className="hCell" xs={1}>
//         Balance
//         &nbsp;
//         &nbsp;
//         <Badge
//           className="button"
//           variant="secondary"
//           onClick={() => sorting({ event, field: 'amount' })}
//         >
//           <FontAwesomeIcon icon={icon2} />
//         </Badge>
//       </Col>
//       <Col className="hCell" xs={1} style={style}>
//         Card
//       </Col>
//       <Col className="hCell" xs={1}>
//         Status
//       </Col>
//     </Row>
//   )
// }
