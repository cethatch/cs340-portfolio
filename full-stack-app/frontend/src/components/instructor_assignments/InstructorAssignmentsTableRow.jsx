/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

// import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ assignment }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit class page
  const handleEdit = () => {
    // We can access the id (and query the person) with useParams() in the UpdatePerson component
    navigate("/instructor_assignments/update/" + assignment.classInstructorID, { state: { assignment } });
  };

  const deleteRow = async () => {
    navigate("/instructor_assignments/delete/" + assignment.classInstructorID, { state: { assignment } });
  };

  return (
    <tr key={assignment.classInstructorID}>
        <td> {assignment.classInstructorID} </td>
        <td> {assignment.instFirstName} </td>
        <td> {assignment.instLastName} </td>
        <td> {assignment.classInstanceID} </td>
        <td> {assignment.className} </td>
        <td> {assignment.classDate} </td>
        <td> {assignment.classTime} </td>
        <td> {assignment.kitchenLocation} </td>
        <td> {assignment.privateEvent} </td>
        <td className="editCol">
          <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }}/>
        </td>
        <td>
        <MdDelete onClick={deleteRow} size={25} style={{ cursor: "pointer"}} />
        </td>
      </tr>

  );
};

export default TableRow;