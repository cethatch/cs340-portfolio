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
const TableRow = ({ assignment }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Convert bool value to plain english Yes/No
  const privateEvent_translated = assignment.privateEvent ? "Yes" : "No";
  
  // Redirect to edit classInstructor page
  const handleEdit = () => {
    // We can access the id (and query the person) with useParams() in the UpdatePerson component
    navigate("/instructor_assignments/update/" + assignment.classInstructorID, { state: { assignment } });
  };
  // Redirect to delete classInstructor page
  const deleteRow = async () => {
    navigate("/instructor_assignments/delete/" + assignment.classInstructorID, { state: { assignment } });
  };

  return (
    <tr key={assignment.classInstructorID}>
        <td> {assignment.classInstructorID} </td>
        <td> {assignment.instructorID ? assignment.instFirstName + " " + assignment.instLastName : "Null"} </td>
        <td> {assignment.classInstanceID} </td>
        <td> {assignment.className} </td>
        <td> {new Date(assignment.classDate).toLocaleDateString()} </td>
        <td>{new Date(`1970-01-01T${assignment.classTime}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' })}</td>
        <td> {assignment.kitchenLocation ? assignment.kitchenLocation : "Null"} </td>
        <td> {privateEvent_translated} </td>
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