/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ student }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit class page
  const handleEdit = () => {
    // We can access the id (and query the person) with useParams() in the UpdatePerson component
    // navigate("/classes/update/" + classes.id, { state: { classes } });
    navigate(`/students/update/${student.studentID}`, {state: {student}});
  };

  const deleteRow = async () => {
    navigate(`/students/delete/${student.studentID}`, {state: {student}});
  };

  return (
    <tr key={student.studentID}>
      <td>{student.studentID}</td>
      <td>{student.firstName}</td>
      <td>{student.lastName}</td>
      <td>{student.phoneNumber}</td>
      <td>{student.email}</td>
      <td className="editCol">
        <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }}/>
      </td>
      <td className="editCol">
        <MdDelete onClick={deleteRow} size={25} style={{ cursor: "pointer"}} />
      </td>
    </tr>

  );
};

export default TableRow;