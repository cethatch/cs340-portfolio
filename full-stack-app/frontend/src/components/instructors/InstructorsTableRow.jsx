/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ instructor }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit instructor page
  const handleEdit = () => {
    // We can access the id (and query the instructor) with useParams() in the UpdateInstructor component
    navigate(`/instructors/update/${instructor.instructorID}`, { state: { instructor } });
  };

  const deleteRow = async () => {
    navigate(`/instructors/delete/${instructor.instructorID}`, {state: { instructor }});
  };

  return (
    <tr key={instructor.instructorID}>
      <td>{instructor.instructorID}</td>
      <td>{instructor.instFirstName}</td>
      <td>{instructor.instLastName}</td>
      <td>{instructor.phoneNumber}</td>
      <td>{instructor.email}</td>
      <td>{new Date(instructor.hireDate).toLocaleDateString()}</td>
      <td>{instructor.specialtyName}</td>
      <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(instructor.hourlyRate)}</td>
      <td>
        <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
      </td>
      <td>
        <MdDelete onClick={deleteRow} size={25} style={{ cursor: "pointer"}} />
      </td>
    </tr>
  );
};

export default TableRow;