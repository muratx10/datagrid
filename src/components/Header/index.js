import TableHeader from './TableHeader';
import { Table } from 'react-bootstrap';
import React from 'react';

export default TableHeader;

// <Table hover bordered>
//   <thead>
//   <tr>
//     <th className={`${classes.header} ${classes.fixedColHeader}`}>Name</th>
//     <th className={classes.header}>Gender</th>
//     <th className={classes.header}>Date of birth</th>
//     <th className={classes.header}>Address</th>
//     <th className={classes.header}>Bank</th>
//     <th className={classes.header}>Currency</th>
//     <th className={classes.header}>
//       Balance
//       <button onClick={() => useSort()}>s</button>
//     </th>
//     <th className={classes.header}>Status</th>
//   </tr>
//   </thead>
//   <tbody>
//   {dataToProps(fake)}
//   </tbody>
// </Table>

// <tr>
//   <td className={classes.fixedCol}>
//     {item.name}
//   </td>
//   <td>
//     {item.gender ? 'male' : 'female'
//   </td>
//   <td>
//     {item.birthDate}
//   </td>
//   <td>
//     {item.locationName.city}
//     &nbsp;
//     {item.locationName.zipcode}
//   </td>
//   <td>
//     {item.bankName}
//   </td>
//   <td>
//     {currency}
//   </td>
//   <td>
//     {item.amount}
//   </td>
//   <td className={statusColor}>
//     {item.isActive ? 'active' : 'locked'}
//   </td>
// </tr>
