/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

// import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ specialty }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit class page
  const handleEdit = () => {
    // We can access the id (and query the person) with useParams() in the UpdatePerson component
    // navigate("/classes/update/" + classes.id, { state: { classes } });
    navigate(`/specialties/update/${specialty.specialtyID}`, { state: {specialty}});
  };

  const deleteRow = async () => {
    navigate(`/specialties/delete/${specialties.specialtyID}`, {state: {specialty}});
  };

  return (
    <tr key={specialty.specialtyID}>
      <td>{specialty.specialtyID}</td>
      <td>{specialty.specialtyName}</td>
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