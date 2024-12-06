/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ classInstance }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit class page
  const handleEdit = () => {
    navigate(`/schedule/update/${classInstance.classInstanceID}`, { state: { classInstance } });
  };

  const privateEvent_translated = classInstance.privateEvent ? "Yes" : "No";

  return (
    <tr key={classInstance.classInstanceID}>
      <td>{classInstance.classInstanceID}</td>
      <td>{classInstance.className}</td>
      <td>{new Date(classInstance.classDate).toLocaleDateString()}</td>
      <td>{new Date(`1970-01-01T${classInstance.classTime}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })}</td>
      <td>{classInstance.kitchenLocation ? classInstance.kitchenLocation : "Null"}</td>
      <td>{privateEvent_translated}</td>
      <td className="editCol">
        <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
      </td>
    </tr>
  );
};

export default TableRow;