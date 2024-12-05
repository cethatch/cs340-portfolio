/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
// const TableRow = ({ classes, fetchClasses }) => {
const TableRow = ( {invoice} ) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit class page
  const handleEdit = () => {
    // We can access the id (and query the person) with useParams() in the UpdatePerson component
    navigate(`/invoices/update/${invoice.invoiceID}`, { state: { invoice } } );
  };

  return (
    <tr key={invoice.invoiceID}>
      <td>{invoice.invoiceID}</td>
      <td>{invoice.studentID}</td>
      <td>{invoice.firstName + " " + invoice.lastName}</td>
      <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
      <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(invoice.invoiceTotal)}</td>
      <td>{invoice.invoicePaid ? "Yes" : "No"}</td>
      <td>{invoice.comments}</td>
      <td>
        <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
      </td>
    </tr>
  );
};

export default TableRow;